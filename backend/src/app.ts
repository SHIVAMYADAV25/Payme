import express , { type Express } from "express"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import accountRouter from "./router/account.routes.js"

const app : Express = express();

app.use(express.json());
app.use(cookieParser());

import userRouter from "./router/user.routes.js"

app.use("/api/v1/user",userRouter);
app.use("api/v1/account",accountRouter)

export {app};