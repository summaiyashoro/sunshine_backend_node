import express from 'express';
import { InvesterClass } from '../models/investerModel.js';
const router = express.Router();


router.post('/login_investor',async(req, res)=>{
    try{
     const data = await InvesterClass.loginInvester(req.body);
     res.json({success:true , data:data});
    }catch(err){
     res.json({success:false , data: [], error:err?.message});
    }
})

export default router;