import express from 'express';
const router = express.Router();

import {RentalIncomeClass} from '../models/rentalIncomeModel.js';

router.post('/add_rental_income',(req, res)=>{
    const data = RentalIncomeClass.addRentalIncome(req.body);
    res.send({success:true , data});
})

router.post('/edit-rental-income',(req, res)=>{
    const data = RentalIncomeClass.editRentalIncome(req.body);
    res.send({success:true , data});
})

export default router;