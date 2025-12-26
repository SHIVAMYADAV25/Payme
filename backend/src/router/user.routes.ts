import { Router, type Router as ExpressRouter } from "express";
import { bulk, signin, signup, updateUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router : ExpressRouter= Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/update").put(verifyJWT,updateUser);
router.route("/bulk").get(verifyJWT,bulk);


// router.route("/me").get(verifyJWT,(req : Request,res : Response)=>{
//     return res.status(200).json({ user: req.user })
// })

export default router