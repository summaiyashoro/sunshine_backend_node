import express from 'express';
const router = express.Router();

import {MaintainanceClass} from '../models/maintainanceModel.js';

router.post('/add-maintenance',(req, res)=>{
    const data = MaintainanceClass.addMaintainance(req.body);
    res.send({success:true , data});
})

router.post('/edit-single-maintenance',(req, res)=>{
    const data = MaintainanceClass.editMaintainance(req.body);
    res.send({success:true , data});
})

export default router;