import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = (req,res,next)=>{
    const authHeader = JSON.stringify(req.headers["authorization"])
    let token = authHeader && authHeader.split(' ')[1];
    token = token.slice(0, -1);
    if(token==null){
        return res.status(401).json({
            message:"Token is Missing"
        })
    }
    jwt.verify(token,process.env.ACCESS_SECERET_KEY,(err,user)=>{
        if(err){
            console.log(err)
            return res.status(403).json({
                message:"Invalid Token"
            })
        }
        req.user = user;
        next();
    })
}