import { DataTypes, Sequelize } from "sequelize";
import db from '../config.db.js';

const attributes = {
    activityID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    activity_message: { 
      type: DataTypes.STRING, 
      allowNull: false 
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

    static async Initialize() {
        try {
            this.table = db.sequelize.define("activity_trail", attributes, {
                freezeTableName: true,
                timestamps: true,
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
            attributes:[
              'activityID',
              'activity_message'
            ],
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
            createdBy: body?.userId
          });
    
          return response;
        } catch (error) {
          throw new Error(error?.message);
        }
    }
}