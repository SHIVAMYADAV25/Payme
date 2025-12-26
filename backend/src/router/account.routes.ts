import { Router  ,type Router as ExpressRouter} from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { balance, transfer } from "../controller/account.controller.js";

const router : ExpressRouter = Router();

router.route("/balance").get(verifyJWT,balance);
router.route("/Transfer").post(verifyJWT,transfer);

export {
    router
}