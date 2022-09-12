import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/userService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export async function validateToken( req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
        throw { type: "unauthorized", message: "Missing authorization token" };
    }
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        throw { type: "unauthorized", message: "Authorization missing token"};
    }
    
    try {
        
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
        const user = await getUserById(userId);
        res.locals.user = user;
        next();

    } catch {
        throw { type: "unauthorized", message: "Invalid token"}
    }
}