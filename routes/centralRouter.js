import express from 'express';
const router = express.Router();

import investerController from '../controllers/investerController.js';
import propertyController from '../controllers/propertyController.js';
import rentalIncomeController from '../controllers/rentalIncomeController.js';
import maintainanceController from '../controllers/maintainanceController.js';

router.post('/',(req, res)=>{
    res.send("Hello World");
})

router.post('/investor',investerController)

router.post('/property',propertyController)

router.post('/rental_income',rentalIncomeController)

router.post('/maintenance',maintainanceController)

export default router;