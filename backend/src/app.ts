import express , { type Express } from "express"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";

const app : Express = express();

app.use(express.json());
app.use(cookieParser());

import userRouter from "./router/user.routes.js"

app.use("/api/v1/user",userRouter);

export {app};