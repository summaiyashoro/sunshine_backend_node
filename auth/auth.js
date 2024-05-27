import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next) =>{
    try{
        let token = req.headers.authorization;
        if(token){
            token = token?.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            // req.userId = req.user.id;
            
        }else{
            res.status(401).json({message : 'Unauthorized user'});
        }

        next();
    }catch(err){
        console.log("error",err);
        res.status(401).json({message : 'Unauthorized user'});
    }
}