import { User } from "@prisma/client"
import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

export async function login(user: CreateUserData) {
    const userinDB = await findUserinDB(user.email);
    await verifyPassword(user.password, userinDB.password);
    const token = jwt.sign({ userId: userinDB.id }, process.env.JWT_SECRET);
    return token;
}

async function verifyEmailAlreadyRegistered(email: string) {
    const emailRegistered = await userRepository.findUserByEmail(email);
    if(emailRegistered){
        throw {type: "conflict", message: "Email already registered"};
    }
}

async function findUserinDB(email:string) {
    const userRegistered = await userRepository.findUserByEmail(email);
    if(!userRegistered){
        throw {type: "unauthorized", message: "Email need to be registered"};
    }
    return userRegistered;
}

async function verifyPassword(password: string, encryptedPassword: string){
    if(!bcrypt.compareSync(password, encryptedPassword)){
        throw { type : "unauthorized", message: "Incorrect password or email"}
    }
}