import { DataTypes, Sequelize } from "sequelize";
import db from '../config.db.js';

const attributes = {
    propertyID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    propertyName: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    houseAptUnitsOrNum: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    streetNum: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    state: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    city: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    purchasePrice: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    buildArea: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    lotSize: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    purchaseAgreementPDF: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    agentName: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    phone: { 
      type: DataTypes.INTEGER, 
      allowNull: true 
    },
    agentPurchaseAgreementPDF: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    currentPrice: { 
      type: DataTypes.INTEGER,
       allowNull: true 
    },
    currentDate: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    dateOfPurchase: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },

//     "propertyImages": [
//         {
//             "file": {},
//             "url": "blob:http://localhost:3000/c197298a-6fa2-4a10-8f53-61a3be6e984e"
//         },
//         {
//             "file": {},
//             "url": "blob:http://localhost:3000/8f9eecfe-d9ab-40b0-b661-e770ebfc6bdf"
//         }
//     ],

    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
};

export class PropertyClass {
    static table;
    static initialize = false;
    static where={};

    static async Initialize() {
        try {
            this.table = db.sequelize.define("Property", attributes, {
                freezeTableName: true,
                timestamps: true,
            });
            await db.sequelize.sync();
            PropertyClass.initialize = true;
            return PropertyClass.initialize;
        }
        catch (error) {
            throw new Error(`Error in initializing PropertyClass ${error}`);
        }
    }

    static async getAllProperties(body) {
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

    
    static async addProperty(body, files) {
        try {
        let response = [];
        response = await this.table.create({
            propertyName: body?.propertyName ,
            houseAptUnitsOrNum: body?.houseAptUnitsOrNum ,
            streetNum: body?.streetNum ,
            state: body?.state ,
            city: body?.city ,
            purchasePrice: body?.purchasePrice ,
            buildArea: body?.buildArea ,
            lotSize: body?.lotSize ,
            purchaseAgreementPDF: body?.purchaseAgreementPDF ,
            agentName: body?.agentName,
            email: body?.email ,
            phone: body?.phone ,
            agentPurchaseAgreementPDF: body?.agentPurchaseAgreementPDF ,
            currentPrice: body?.currentPrice ,
            currentDate: body?.currentDate ,
            address: body?.address ,
            dateOfPurchase: body?.dateOfPurchase ,
            createdBy: body?.userID,
        });

        return response;
        } catch (error) {
        console.log("error", error);
        throw new Error(error?.message);
        }
    }

    static async editProperty(body,files) {
        try {
          let response = [];
          const rowID = body?.propertyID;
          const userId = body.userId
          delete body.userId
          const fieldsToUpdate = {};
    
          body &&  Object.keys(body).forEach((key)=>{
            fieldsToUpdate[key] = body[key];
          })
    
          response = await this.table.update({
            ...fieldsToUpdate,
            updatedBy:userId
          },
          {
              where:{Id : rowID, createdBy:userId}
          });
         
    
          return response;
        } catch (error) {
          throw new Error("Error in editProperty");
        }
      }
}