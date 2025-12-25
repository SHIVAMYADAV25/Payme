import  { user }  from "../models/user.model.js";
import type { Request , Response } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';

const COOKIE_OPTIONS = {
    httpOnly : true,
    secure : false,
    samesite : "strcit" as const
}

const signup = async (req : Request,res: Response) => {
    let {username,password} = req.body;

    if (!username || !password){
        res.status(400).json({
            "Message" : "please enter the required fields"
        })
    }

    const User = await user.findOne({
        $or : [{username}]
    })

    if(!user){
        return res.status(402).json({
            message : "Username already exist"
        })
    }

    const hashedPass = await bcrypt.hash(password,10);

    const NewUser = await user.create({
        username,
        password : hashedPass,
    })

    const token = jwt.sign(
        {id : NewUser._id},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn : "1d"}
    )
    
    res.cookie("accessToken" , token , COOKIE_OPTIONS);

    return res.status(200).json({
        message : "signup successful",
    })
}
