import express from 'express';
const router = express.Router();

import {RentalIncomeClass} from '../models/rentalIncomeModel.js';

router.post('/add_rental_income',async(req, res)=>{
    const data = await RentalIncomeClass.addRentalIncome(req.body);
    res.send({success:true , data});
})

router.post('/edit-rental-income',async(req, res)=>{
    const data = await RentalIncomeClass.editRentalIncome(req.body);
    res.send({success:true , data});
})

export default router;