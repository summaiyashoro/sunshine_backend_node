import express from 'express';
const router = express.Router();

import { activityClass } from '../models/activityModel.js';

router.post('/add_trail',async(req, res)=>{
    try{
        const data = await activityClass.addActivity(req.body);
        res.send({success:true , data});
    }catch(err){
        res.status(500).send({success:false , data: [], error:err?.message});
    }
})

router.post('/get_all_trails',async(req, res)=>{
   try{
    const data = await activityClass.getAllActivities(req.body);
    res.send({success:true , data});
   }catch(err){
    res.status(500).send({success:false , data: [], error:err?.message});
   }
})

export default router;