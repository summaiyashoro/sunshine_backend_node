import express from 'express';
const router = express.Router();

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

router.post('/add_investor',upload.fields([{ name: 'purchaseAgreementPDF' }, { name: 'unitHolderPurchaseAgreementPDF' }]),async(req, res)=>{
    try{    
        const data = await InvesterClass.addInvester(req.body, req.files);
        res.send({success:true});
    }catch(err){
        console.log("err",err.message);
        res.status(500).send({success:false , data: [], error:err?.message});
    }

})

router.post('/edit_investor',upload.fields([{ name: 'purchaseAgreementPDF' }, { name: 'unitHolderPurchaseAgreementPDF' }]),async(req, res)=>{
    try{
        console.log("req.body",req.body);
        const data = await InvesterClass.editInvester(req.body,req.files);
        res.send({success:true});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})


export default router