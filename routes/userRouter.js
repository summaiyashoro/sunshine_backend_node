import express from 'express';
const router = express.Router();

import {UserClass} from '../models/userModel.js'; 

router.post('/create_user',(req, res)=>{
    const data = UserClass.createUser(req.body);
    res.send({success:true , data});
})

router.post('/login_user',(req, res)=>{
    const data = UserClass.loginUser(req.body);
    res.send({success:true , data});
})

export default router;