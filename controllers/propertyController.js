import express from 'express';
const router = express.Router();

import {PropertyClass} from '../models/propertyModel.js';

router.post('/add_property',(req, res)=>{
    const data = PropertyClass.addProperty(req.body);
    res.send({success:true , data});
})

router.post('/edit_property',(req, res)=>{
    const data = PropertyClass.editProperty(req.body);
    res.send({success:true , data});
})

export default router;