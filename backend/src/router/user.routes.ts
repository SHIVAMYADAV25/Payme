import type {Request , Response } from "express"
import { Router, type Router as ExpressRouter } from "express";
import { signin, signup } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router : ExpressRouter= Router();


router.route("/signup").post(signup);
router.route("/signin").post(signin);

// router.route("/me").get(verifyJWT,(req : Request,res : Response)=>{
//     return res.status(200).json({ user: req.user })
// })



export default router