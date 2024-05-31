import express from 'express';
const router = express.Router();
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import {InvesterClass} from '../models/investerModel.js';
import upload from '../middlewares/fileUpload.js';

router.post('/get_investors',async(req, res)=>{
    try{
        const data = await InvesterClass.getAllInvesters(req.body);
        res.send({success:true , data:data});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})

router.post('/get_single_invester',async(req, res)=>{
    try{
        const response = await InvesterClass.getSingleInvester(req.body);
        if(response?.length > 0){
            const data = response[0];
            let purchaseAgreementPDF = null;
            let unitHolderPurchaseAgreementPDF = null;
      
            const purchaseAgreementPDF_filePatch = path.join('uploads', data.purchaseAgreementPDF);
            const unitHolderPurchaseAgreementPDF_filePatch = path.join('uploads', data.unitHolderPurchaseAgreementPDF);
      
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

            const filePath1 = path.join(__dirname, '..', 'uploads', data.purchaseAgreementPDF);
            console.log('purchaseAgreementPDF_filePatch',fs.existsSync(filePath1));

            if (fs.existsSync(purchaseAgreementPDF_filePatch)) {
              purchaseAgreementPDF = fs.createReadStream(purchaseAgreementPDF_filePatch);
              console.log("purchaseAgreementPDF",purchaseAgreementPDF);
            //   fileStream1.pipe(res, { end: false });
            }
      
            if (fs.existsSync(unitHolderPurchaseAgreementPDF_filePatch)) {
              unitHolderPurchaseAgreementPDF = fs.createReadStream(unitHolderPurchaseAgreementPDF_filePatch);
            //   fileStream2.pipe(res); 
            }
        }

        res.send({success:true , data:response});

    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})

router.post('/add_investor',upload.fields([{ name: 'purchaseAgreementPDF' }, { name: 'unitHolderPurchaseAgreementPDF' }]),async(req, res)=>{
    try{    
        await InvesterClass.addInvester(req.body, req.files);
        res.send({success:true});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }

})

router.post('/edit_investor',upload.fields([{ name: 'purchaseAgreementPDF' }, { name: 'unitHolderPurchaseAgreementPDF' }]),async(req, res)=>{
    try{
        await InvesterClass.editInvester(req.body,req.files);
        res.send({success:true});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})


export default router