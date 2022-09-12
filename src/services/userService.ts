import { User } from "@prisma/client"
import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

export type CreateUserData = Omit<User, "id">;

export async function createUser(user: CreateUserData) {
    await verifyEmailAlreadyRegistered(user.email);

    const SALT = 10;
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    const data = {
        email: user.email,
        password: encryptedPassword    
    }
    await userRepository.insertUser(data);
}

export async function login(email: string, password: string) {
    
}

async function verifyEmailAlreadyRegistered(email: string) {
    const emailRegistered = await userRepository.findUserByEmail(email);
    if(emailRegistered){
        throw {type: "conflict", message: "Email already registered"};
    }
}