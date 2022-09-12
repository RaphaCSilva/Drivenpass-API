import { prisma } from "../config/database.js";
import { CreateCardData } from "../services/cardService.js";

export async function getCardByTitleandUserid(userId: number, title: string){
    return prisma.card.findFirst({
        where: {
            userId,
            title
        }
    });
}

export async function insertCard(userId: number, card: CreateCardData){
    return prisma.card.create({
        data: {... card, userId}
    });
}