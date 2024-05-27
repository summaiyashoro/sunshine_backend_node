import express from 'express';
const router = express.Router();

import {PropertyClass} from '../models/propertyModel.js';
import upload from '../middlewares/fileUpload.js';


router.post('/get_propperties',async(req, res)=>{
    try{
        const data = await PropertyClass.getAllProperties(req.body);
        res.send({success:true , data:data});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})

router.post('/add_property',upload.fields([{ name: 'purchaseAgreementPDF' }, { name: 'unitHolderPurchaseAgreementPDF' }]),async(req, res)=>{
    try{    
        const data = await PropertyClass.addProperty(req.body, req.files);
        res.send({success:true});
    }catch(err){
        console.log("err",err.message);
        res.status(500).send({success:false , data: [], error:err?.message});
    }

})

router.post('/edit_property',async(req, res)=>{
    const data = await PropertyClass.editProperty(req.body);
    res.send({success:true , data});
})

export default router;