import { prisma } from "../config/database.js";
import { CreateUserData } from "../services/userService.js";

export async function findUserByEmail(email: string){
    return prisma.user.findFirst({
        where: { email }
    });
}

export async function insertUser(user: CreateUserData) {
    return prisma.user.create({
        data: user
    });
}

export async function findUserById(id: number) {
    return prisma.user.findFirst({
        where: {id}
    });
}