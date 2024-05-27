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
    propertyName: { type: DataTypes.STRING, allowNull: false },
    houseAptUnitsOrNum: { type: DataTypes.STRING, allowNull: true },
    streetNum: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    purchasePrice: { type: DataTypes.INTEGER, allowNull: true },
    buildArea: { type: DataTypes.STRING, allowNull: true },
    lotSize: { type: DataTypes.STRING, allowNull: true },
    purchaseAgreementPDF: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    purchaseAgreementPDF_Filename: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    agentName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.INTEGER, allowNull: true },
    agentPurchaseAgreementPDF_Filename: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    agentPurchaseAgreementPDF: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    currentPrice: { type: DataTypes.INTEGER, allowNull: true },
    currentDate: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    dateOfPurchase: { type: DataTypes.STRING, allowNull: true },



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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: moment.utc().format("YYYY-MM-DD HH:mm:ss"),
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
        const purchaseAgreementPDF = files["purchaseAgreementPDF"];
        const agentPurchaseAgreementPDF =
          files["agentPurchaseAgreementPDF"];
  
        const purchaseAgreementPDFBuffer = purchaseAgreementPDF ? purchaseAgreementPDF[0]?.buffer : null;
        const agentPurchaseAgreementPDFBUffer = agentPurchaseAgreementPDF ? agentPurchaseAgreementPDF[0]?.buffer : null;

        response = await this.table.create({
            propertyName: body?.propertyName ,
            houseAptUnitsOrNum: body?.houseAptUnitsOrNum ,
            streetNum: body?.streetNum ,
            state: body?.state ,
            city: body?.city ,
            purchasePrice: body?.purchasePrice ,
            buildArea: body?.buildArea ,
            lotSize: body?.lotSize ,
            purchaseAgreementPDF: purchaseAgreementPDFBuffer ,
            purchaseAgreementPDF_Filename: body?.purchaseAgreementPDF_Filename?.filename ,
            agentName: body?.agentName,
            email: body?.email ,
            phone: body?.phone ,
            agentPurchaseAgreementPDF_Filename: body?.agentPurchaseAgreementPDF_Filename ,
            agentPurchaseAgreementPDF: agentPurchaseAgreementPDFBUffer ,
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
          const rowID = body?.id;
          delete body.userID
          const fieldsToUpdate = {};
    
          if(Object.keys(files)?.length >0){
            const purchaseAgreementPDF = files["purchaseAgreementPDF"];
            const agentPurchaseAgreementPDF = files["agentPurchaseAgreementPDF"];
            const purchaseAgreementPDFBuffer = purchaseAgreementPDF ? purchaseAgreementPDF[0]?.buffer : null;
            const agentPurchaseAgreementPDFBuffer = agentPurchaseAgreementPDF ? agentPurchaseAgreementPDF[0]?.buffer : null;
    
    
            fieldsToUpdate['purchaseAgreementPDF'] = purchaseAgreementPDFBuffer?.toString('binary');
            fieldsToUpdate['agentPurchaseAgreementPDF'] = agentPurchaseAgreementPDFBuffer?.toString('binary');
          }
    
    
          body &&  Object.keys(body).forEach((key)=>{
            fieldsToUpdate[key] = body[key];
          })
    
          response = await this.table.update({
            ...fieldsToUpdate},{
              where:{Id : rowID}
            });
         
    
          return response;
        } catch (error) {
          throw new Error("Error in getDashboardPEBalanceGraphAndSplits");
        }
      }
}