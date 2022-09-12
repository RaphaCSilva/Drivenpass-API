import { Request, Response } from "express";
import * as userService from "../services/userService.js";


export async function createUser(req: Request, res: Response) {
    const user = req.body;
    await userService.createUser(user);
    res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
    
}