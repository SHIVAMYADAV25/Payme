import mongoose, { Schema } from "mongoose";

const UserSchema = Schema.create({
    username : {
        type: String,
        required: true,
        toLocaleLowerCase  : true,
        trim : true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim : true,
        index :true
    },
    amount : {
        type : Number,
        default:1000,
    }
}, {
    timestamps : true
})

export const user = mongoose.model("User",UserSchema);