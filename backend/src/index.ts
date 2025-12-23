import express from "express"
import { connectDB } from "./db/db.js";

const app = express();

app.post("/signup",(req,res)=>{
    let {username,password} = req.body;

    if (!username && !password){
        res.status(400).json({
            "Message" : "please enter the required fields"
        })
    }
    
})

connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})