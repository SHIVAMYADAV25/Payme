import mongoose, { Schema } from "mongoose"
import { user } from "./user.model.js"

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: user,
        require : true
    },
    balance:{
        type : Number,
        require : true
    }
})


export const Account = mongoose.model("accountSchema",accountSchema)