import { prisma } from "../config/database.js";
import { CreateCredentialData } from "../services/credentalService.js";

export async function getCredentialByTitleandUserid(userId: number, title: string){
    return prisma.credential.findFirst({
        where: {
            userId,
            title
        }
    });
}

export async function insertCredential(userId: number, credential: CreateCredentialData){
    return prisma.credential.create({
        data: {... credential, userId}
    });
}

export async function findAllCredentialsByUserID(userId: number){
    return prisma.credential.findMany({
        where: {userId}
    });
}

export async function findCredentialByIdAndUserId(userId: number, credentialId: number){
    return prisma.credential.findFirst({
        where: {
            userId, 
            id: credentialId
        }
    });
}
