import bcrypt from 'bcrypt';
import User from "../model/user.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../database/token.js';
dotenv.config()
export const signupUser = async(req,res)=>{  
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = await User.create({
            name:req.body.name,
            username:req.body.username,
            password:hashedPassword});
        await newUser.save();
        return res.status(200).json({
            message:'signup successfull'
        })
    }
    catch(errr){
        return res.status(500).json({
            message:"Error while signinup the user"
        })
    }
}
export const loginUser = async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user) {
            return res.status(400).json({
                message:"Username Does not match"
            })
        }
        const match = await bcrypt.compare(req.body.password,user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECERET_KEY,{expiresIn:'15m'});
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
            const newToken =await new Token({Token:refreshToken})
            await newToken.save();
            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});

        }else{
           res.status(400).json({
            message:"Incorrect Password"
           })
        }
        
    }
    catch(err){
        return res.status(500).json({
            message:"Error while login in User"
        })
    }
}