import { DataTypes, Op, Sequelize, col, fn, literal } from "sequelize";
import db from '../config.db.js';

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

export class PropertyClass {
    static table;
    static initialize = false;
    static where={};

    static async Initialize(database) {
        try {
            this.table = db.sequelize.define("Property", attributes, {
                freezeTableName: true,
                // don't add the timestamp attributes (updatedAt, createdAt)
                timestamps: false,
            });
            await db.sequelize.sync();
            PropertyClass.initialize = true;
            return PropertyClass.initialize;
        }
        catch (error) {
            throw new Error(`Error in initializing PropertyClass ${error}`);
        }
    }

    // public constructor(body: any) {
    //     if (
    //         body.orgRole === 'RM' ||
    //         body.orgRole === 'Islamic_RM' ||
    //         body.orgRole === 'EPM'
    //     ) {
    //         PropertyClass.where = {};
    //     } else if (body.orgRole === 'BM' || body.orgRole === 'Islamic_BM') {
    //         PropertyClass.where = { branchcode: body.respCode };
    //     } else {
    //         PropertyClass.where = {};
    //     }
    // }

    static async addProperty(body) {
        try {
            let response = [];
            // let converted_date = new Date(new Date(body.selectedDate).toISOString().split('T')[0]);

            //CASATD Split Fetching Data From Database 
            response = await this.table.create({
                // attributes: [
                //     'CASATD',
                //     [fn('sum', col('BaseBalance')), 'base'],
                //     [fn('sum', col('PEPKRBalance')), 'actual']
                // ],
                // where: this.where,
                // group: ['CASATD'],
                // order: ['CASATD'],
                // raw: true
            })
        
            return response;

        } catch (error) {
            throw new Error("Error in getDashboardPEBalanceGraphAndSplits");
        }
    }

    static async editProperty(body) {
        try {
            let response = [];
            // let converted_date = new Date(new Date(body.selectedDate).toISOString().split('T')[0]);

            //CASATD Split Fetching Data From Database 
            response = await this.table.update({
                // attributes: [
                //     'CASATD',
                //     [fn('sum', col('BaseBalance')), 'base'],
                //     [fn('sum', col('PEPKRBalance')), 'actual']
                // ],
                // where: this.where,
                // group: ['CASATD'],
                // order: ['CASATD'],
                // raw: true
            })
        
            return response;

        } catch (error) {
            throw new Error("Error in getDashboardPEBalanceGraphAndSplits");
        }
    }
}