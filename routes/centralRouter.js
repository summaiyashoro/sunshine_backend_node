import express from 'express';
const router = express.Router();

import investerController from '../controllers/investerController.js';
import propertyController from '../controllers/propertyController.js';
import rentalIncomeController from '../controllers/rentalIncomeController.js';
import maintainanceController from '../controllers/maintainanceController.js';
import activityController from '../controllers/activityController.js';

router.use('/investor',investerController)

router.use('/property',propertyController)

router.use('/rental_income',rentalIncomeController)

router.use('/maintenance',maintainanceController)

router.use('/activity', activityController)


export default router;