import express from 'express';
const router = express.Router();

import {InvesterClass} from '../models/investerModel.js';


router.post('/add_investor',(req, res)=>{
    const data = InvesterClass.addInvester(req.body);
    res.send({success:true , data});
})

router.post('/edit_investor',(req, res)=>{
    const data = InvesterClass.editInvester(req.body);
    res.send({success:true , data});
})


export default router