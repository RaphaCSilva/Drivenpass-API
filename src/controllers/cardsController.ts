import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response) {
    const { user } = res.locals;
    const card = req.body;
    await cardService.createCard(user, card);

    res.sendStatus(201);
}

export async function getCards(req: Request, res: Response) {
    const { user } = res.locals;
   
    const cards = await cardService.getCards(user.id);

    res.status(200).send(cards)
}

export async function getCard(req: Request, res: Response) {
    const { user } = res.locals;
    const cardId = parseInt(req.params.id);
    if(cardId === NaN){
        res.sendStatus(422);
    }

    const card = await cardService.getSpecificCard(user.id, cardId);
    res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response){
    const { user } = res.locals;
    const cardId = parseInt(req.params.id);
    if(cardId === NaN){
        res.sendStatus(422);
    }

    await cardService.deleteCard(user, cardId);
    res.sendStatus(200);
}