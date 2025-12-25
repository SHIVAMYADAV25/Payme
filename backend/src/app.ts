import express from "express"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup",(req,res)=>{
    
})

export {app};