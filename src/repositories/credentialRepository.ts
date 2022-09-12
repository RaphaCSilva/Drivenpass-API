import { prisma } from "../config/database.js";

export async function findAllCredentialsByUserID(userId: number){
    return prisma.credential.findMany({
        where: {userId}
    });
}