import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as credentialRepository from "../repositories/credentialRepository.js";

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function getCredentials(userId: number){
    const credentials = await credentialRepository.findAllCredentialsByUserID(userId);
    
    credentials.forEach(credential => {
        credential.password = cryptr.decrypt(credential.password)
    });
    return credentials
}