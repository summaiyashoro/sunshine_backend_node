import { DataTypes, Op, Sequelize, col, fn, literal } from "sequelize";
import db from "../config.db.js";
import moment from "moment";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const attributes = {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  shareHolder: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  unitHolder: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchaseAgreementPDF: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unitHolderInvestedAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unitHolderInvestedUnits: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sharesAllocated: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unitHolderPurchaseAgreementPDF: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateOfPurchase: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sharesallocateddate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export class InvesterClass {
  static table;
  static initialize = false;
  static where = {};

  static async Initialize(database) {
    try {
      this.table = db.sequelize.define("Invester", attributes, {
        freezeTableName: true,
        timestamps: true,
      });
      await db.sequelize.sync();
      InvesterClass.initialize = true;
      return InvesterClass.initialize;
    } catch (error) {
      throw new Error(`Error in initializing InvesterClass ${error}`);
    }
  }

  static async getAllInvesters(body) {
    try {
      let response = [];

      response = await this.table.findAll({
        attributes:[
          'Id',
          'shareHolder',
          'unitHolder',
          'firstName',
          'lastName',
          'address',
          'phoneNumber',
          'email',
          'purchaseAgreementPDF',
          'unitHolderInvestedAmount',
          'unitHolderInvestedUnits',
          'sharesAllocated',
          'unitHolderPurchaseAgreementPDF',
          'dateOfPurchase',
          'sharesallocateddate'
        ],
        where: {createdBy : body?.userId},
        raw: true
    })
      
      return response;
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  static async getSingleInvester(body) {
    try {
      let response = [];

      response = await this.table.findAll({
        attributes:[
          'Id',
          'shareHolder',
          'unitHolder',
          'firstName',
          'lastName',
          'address',
          'phoneNumber',
          'email',
          'purchaseAgreementPDF',
          'unitHolderInvestedAmount',
          'unitHolderInvestedUnits',
          'sharesAllocated',
          'unitHolderPurchaseAgreementPDF',
          'dateOfPurchase',
          'sharesallocateddate'
        ],
        where: {createdBy : body?.userId, Id : body.investerID},
        raw: true
    })
    // response.purchaseAgreementPDF = 
      return response;
    } catch (error) {
      throw new Error(error?.message);
    }
  }


  static async addInvester(body, files) {
    try {
      let response = [];
      console.log("body",body);
      const email = body.email;
      const userExists = await this.table.findOne({
        where: { email:email },
      });
      if (userExists) {
        throw new Error("Email is already associated with an account");
      }

      const saltRounds= parseInt(process.env.saltRounds);
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(body?.password, salt);

      response = await this.table.create({
        shareHolder: body?.shareHolder,
        unitHolder: body?.unitHolder,
        firstName: body?.firstName,
        lastName: body?.lastName,
        address: body?.address,
        phoneNumber: body?.phoneNumber,
        email: body.email,
        purchaseAgreementPDF: body?.purchaseAgreementPDF,
        password: hashedPassword,
        unitHolderInvestedAmount: body?.unitHolderInvestedAmount,
        unitHolderInvestedUnits: body?.unitHolderInvestedUnits,
        unitHolderPurchaseAgreementPDF: body?.unitHolderPurchaseAgreementPDF,
        sharesAllocated: body?.sharesAllocated,
        sharesallocateddate: body?.sharesallocateddate,
        dateOfPurchase: body?.dateOfPurchase,
        createdBy: body?.userID,
      });

      return response;
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  static async editInvester(body,files) {
    try {
      let response = [];
      const rowID = body?.id;
      delete body.userID
      const fieldsToUpdate = {};

      body &&  Object.keys(body).forEach((key)=>{
        fieldsToUpdate[key] = body[key];
      })

      response = await this.table.update({
        ...fieldsToUpdate},{
          where:{Id : rowID}
        });

      return response;
    } catch (error) {
      throw new Error(error?.message);
    }
  }

  static async loginInvester(body) {
    try {
      const { email, password } = body;
      const user = await this.table.findOne({
        where: { email },
      });

      if (!user) {
        throw new Error('Email not found');
      }

      // Verify password
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        throw new Error('Incorrect email or password');
      }

      // Authenticate user with jwt
      const token = jwt.sign({ id: user.Id }, process.env.JWT_SECRET, {
        expiresIn:'1d',
      });

      return {
        investerID: user.Id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken: token,
      }
    } catch (error) {
      console.log("error",error);
      throw new Error(error?.message);
    }
  }
}
