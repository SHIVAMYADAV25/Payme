import type { NextFunction , Request , Response} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

declare global{
    namespace Express {
        interface Request {
            user? : JwtPayload | string;
        }
    }
}


export const verifyJWT = (req : Request, res : Response , next : NextFunction) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ","");

         if (!token) {
        return res.status(401).json({
        message: "Unauthorized request Token missing"
      });
    }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string); 

        req.user = decodedToken;
        next();
    }catch(err){
        return res.status(401).json({
            message : "Invalid or expired token"
        })
    }
}