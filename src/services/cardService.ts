import { User, Card } from "@prisma/client";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as cardRepository from "../repositories/cardRepository.js";
dotenv.config();

export type CreateCardData = Omit<Card, "id">;

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createCard(user: User, card: CreateCardData){
    const titleAlreadyinUse = await cardRepository.getCardByTitleandUserid(user.id, card.title);
    if(titleAlreadyinUse){
        throw {type: "conflict", message: "Title already in use"};
    }

    const {password, cvc} = card;
    const credentialData = {...card, password: cryptr.encrypt(password), cvc: cryptr.encrypt(cvc)};
    await cardRepository.insertCard(user.id, credentialData);
}