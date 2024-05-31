import express from 'express';
const router = express.Router();

import {RentalIncomeClass} from '../models/rentalIncomeModel.js';

router.post('/add_rental_income',async(req, res)=>{
    await RentalIncomeClass.addRentalIncome(req.body);
    res.send({success:true});
})

router.post('/edit-rental-income',async(req, res)=>{
    await RentalIncomeClass.editRentalIncome(req.body);
    res.send({success:true});
})

export default router;