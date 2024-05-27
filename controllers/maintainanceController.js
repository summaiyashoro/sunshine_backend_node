import express from 'express';
const router = express.Router();

import {MaintainanceClass} from '../models/maintainanceModel.js';

router.post('/add-maintenance',async(req, res)=>{
    const data =await MaintainanceClass.addMaintainance(req.body);
    res.send({success:true , data});
})

router.post('/edit-single-maintenance',async(req, res)=>{
    const data = await MaintainanceClass.editMaintainance(req.body);
    res.send({success:true , data});
})

export default router;