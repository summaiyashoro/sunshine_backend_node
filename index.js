
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import db from './config.db.js';
import {auth} from './auth/auth.js';

import centralRouter from './routes/centralRouter.js';
import userRouter from './routes/userRouter.js';

import {InvesterClass} from './models/investerModel.js';
import {MaintainanceClass} from './models/maintainanceModel.js';
import {PropertyClass} from './models/propertyModel.js';
import {RentalIncomeClass} from './models/rentalIncomeModel.js';
import {UserClass} from './models/userModel.js';

dotenv.config();
const app = express();

//helmet middleware
app.use(helmet());

//req.body --- body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//compression middleware - for reducing size of response
app.use(compression());

//cors error handling
app.use(cors());

const PORT = process.env.PORT;

app.use('/v1/user',userRouter)
app.use('/v1',auth,centralRouter)

db.sequelize.authenticate().then(()=>{
    //initializing tables
    InvesterClass.Initialize(db);
    MaintainanceClass.Initialize(db);
    PropertyClass.Initialize(db);
    RentalIncomeClass.Initialize(db);
    UserClass.Initialize();

    app.listen(PORT,()=>{
        console.log("App is listening at port", PORT);
    })
}).catch(err =>{
    console.log("error connecting database", err);
})



