import mongoose from "mongoose";
import { Account } from "../models/account.model.js"
import type { Request , Response } from "express";

const balance = async (req:Request,res:Response) => {

    const userId = (req.user as any).id

    const account = await Account.findOne({
        userId : userId
    })

    res.json({
        balance : account?.balance
    })
}

const transfer = async (req:Request,res:Response) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const {to} = req.body;
        const UserId = (req.user as any).id
        let amount = Number(req.body.amount)

        const account = await Account.findOne({
            userId : UserId
        }).session(session);

        if(!account || account.balance === undefined || account.balance === null || account.balance < amount ){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Insufficient balance"
            })
        }

        const toAccount = await Account.findOne({userId : to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Invalid account"
            });
        }

        // perform the transfer
        await Account.updateOne(
            {userId : UserId},
            {$inc : {balance : -amount}}).
            session(session);

        await Account.updateOne({userId : to},
            {$inc : {balance : amount}}).
            session(session);

        await session.commitTransaction();

        res.json({
            message : "Transfer succesful"
        })
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            message : "Transfer failed"
        })
    }finally{
        session.endSession();
    }
}