import { DataTypes, Op, Sequelize, col, fn, literal } from "sequelize";
import db from '../config.db.js';
import moment from "moment";

const attributes = {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    activity_message: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    }

  };

export class activityClass {
    static table;
    static initialize = false;
    static where={};

    static async Initialize(database) {
        try {
            this.table = db.sequelize.define("activity_trail", attributes, {
                freezeTableName: true,
                // don't add the timestamp attributes (updatedAt, createdAt)
                timestamps: false,
            });
            await db.sequelize.sync();
            activityClass.initialize = true;
            return activityClass.initialize;
        }
        catch (error) {
            throw new Error(`Error in initializing activityClass ${error}`);
        }
    }

    static async getAllActivities(body) {
        try {
          let response = [];    
          response = await this.table.findAll({
            where: {createdBy : body?.userId},
            raw: true
        })
          return response;
        } catch (error) {
          throw new Error(error?.message);
        }
    }

    static async addActivity(body) {
        try {
          let response = [];
    
          response = await this.table.create({
            activity_message: body?.activity_message,
            createdBy: body?.userId,
          });
    
          return response;
        } catch (error) {
          throw new Error(error?.message);
        }
    }
}