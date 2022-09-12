import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response) {
    const { user } = res.locals;
    const card = req.body;
    await cardService.createCard(user, card);

    res.sendStatus(201);
}