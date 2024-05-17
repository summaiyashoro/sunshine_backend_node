import { DataTypes, Op, Sequelize, col, fn, literal } from "sequelize";
import db from '../config.db.js';
import bcrypt from 'bcrypt';

const attributes = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: { type: DataTypes.STRING(30), allowNull: false },
    Email: { type: DataTypes.STRING(30), allowNull: false },
  };

export class UserClass {
    static table;
    static initialize = false;
    static where={};

    static async Initialize(database) {
        try {
            this.table = db.sequelize.define("user_sunshine", attributes, {
                freezeTableName: true,
                timestamps: false,
            });
            await db.sequelize.sync();
            UserClass.initialize = true;
            return UserClass.initialize;
        }
        catch (error) {
            throw new Error(`Error in initializing UserClass ${error}`);
        }
    }

    static async createUser(body) {
        try {
            const { name, email, password } = body;
            // Check if the email exists
            const userExists = await this.table.findOne({
                where: {email}
            });
            if (userExists) {
                return res.status(400).send('Email is already associated with an account');
            }

            await db.User.create({
                name,
                email,
                password: await bcrypt.hash(password, 15),
            });
            return res.status(200).send('User Successfully Created');

        } catch (error) {
            throw new Error("Error in createUser");
        }
    }

    static async loginUser(body) {
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({
                where: {email}
            });

            if (!user) {
                return res.status(404).json('Email not found');
            }

            // Verify password
            const passwordValid = await bcrypt.compare(password, user.password);
            if (!passwordValid) {
                return res.status(404).json('Incorrect email and password combination');
            }

            // Authenticate user with jwt
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION
            });

            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token,
            });

        } catch (error) {
            throw new Error("Error in loginUser");
        }
    }
}