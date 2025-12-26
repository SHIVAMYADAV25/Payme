import  {user}  from "../models/user.model.js";
import type { Request , Response } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Account } from "../models/account.model.js";

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

    if(!User){
        return res.status(402).json({
            message : "Username already exist"
        })
    }

    const hashedPass = await bcrypt.hash(password,10);

    const NewUser = await user.create({
        username,
        password : hashedPass,
    })



    const AccountCreated = await Account.create({
        userId : NewUser._id,
        balance : 1 + Math.random() * 1000
    })

    const token = jwt.sign(
        {id : NewUser._id},
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn : "1d"}
    )
    
    res.cookie("accessToken" , token , COOKIE_OPTIONS);

    return res.status(200).json({
        message : "signup successful",
        "token" : token
    })
}


const signin = async (req: Request,res:Response) => {
    let {username,password} = req.body;

    if (!username || !password){
        res.status(400).json({
            "Message" : "please enter the required fields"
        })
    }

    const User = await user.findOne({username});

    if(!User){
        return res.status(402).json({
            message : "Username already exist"
        })
    }

    const isValid = await bcrypt.compare(password,User?.password);

    if(!isValid){
        return res.status(401).json({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign(
            {id : User?._id},
            process.env.ACCESS_TOKEN_SECRET as string,
            {expiresIn : "1d"}
        )

    res.cookie("accesstoken" , token , COOKIE_OPTIONS);

    return res.status(200).json({
        message : "signin successful",
        "token" : token
    })
}

const updateUser = async (req:Request,res:Response) => {
    await user.updateOne(
        req.body,{
        id : req.user
    })

    res.json({
        message : "Upadted successfully"
    })
}

// https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly
// https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like

const bulk = async (req:Request,res : Response) => {
    const filter = typeof req.query.filter === "string" ? req.query.filter : "";

    const Users = await user.find({
        $or : [{
            username : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        "user" : Users.map(user => ({
            username: user.username
        }))
    })
}

export { 
    signin,
    signup,
    bulk,
    updateUser
}