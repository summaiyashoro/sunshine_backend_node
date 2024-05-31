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
    yourProperty: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    tenantFirstName: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    tenantLastName: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    tenantPhone: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    tenantEmail: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    rentAmount: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    selectedDate: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    //object left 
    //   "files": {},

  };

export class RentalIncomeClass {
    static table;
    static initialize = false;
    static where={};

    static async Initialize() {
        try {
            this.table = db.sequelize.define("RetailIncome", attributes, {
                freezeTableName: true,
                timestamps: true,
            });
            await db.sequelize.sync();
            RentalIncomeClass.initialize = true;
            return RentalIncomeClass.initialize;
        }
        catch (error) {
            throw new Error(`Error in initializing RentalIncomeClass ${error}`);
        }
    }

    static async getAllRentalIncome(body) {
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
    static async addRentalIncome(body, files) {
        try {
          let response = [];
    
          response = await this.table.create({
            yourProperty: body?.yourProperty,
            tenantFirstName: body?.tenantFirstName ,
            tenantLastName: body?.tenantLastName ,
            tenantPhone: body?.tenantPhone,
            tenantEmail: body?.tenantEmail ,
            rentAmount: body?.rentAmount,
            selectedDate: body?.selectedDate,
            createdBy: body?.userID,
          });
    
          return response;
        } catch (error) {
          console.log("error", error);
          throw new Error(error?.message);
        }
    }

    static async editRentalIncome(body,files) {
    try {
        let response = [];
        const fieldsToUpdate = {};
        body = body?.fieldsToUpdate;
        investerId = body?.Id

        files ? fieldsToUpdate['purchaseAgreementPDF'] = files["purchaseAgreementPDF"] : null
        files ? fieldsToUpdate['unitHolderPurchaseAgreementPDF'] = files["unitHolderPurchaseAgreementPDF"] : null

        body ??  Object.keys(body).forEach((key)=>{
        fieldsToUpdate[key] = body[key];
        })

        console.log("fieldsToUpdate",fieldsToUpdate);
        console.log("investerId",investerId);

        //CASATD Split Fetching Data From Database
        // response = await this.table.update({
        //   ...fieldsToUpdate,
        //   where:{Id : investerId}
        //   // where: this.where,
        // });

        return response;
    } catch (error) {
        throw new Error("Error in getDashboardPEBalanceGraphAndSplits");
    }
    }

}