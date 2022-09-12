import { User, Credential } from "@prisma/client";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as credentialRepository from "../repositories/credentialRepository.js";
dotenv.config();

export type CreateCredentialData = Omit<Credential, "id">;

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createCredential(user: User, credential: CreateCredentialData){
    const titleAlreadyinUse = await credentialRepository.getCredentialByTitleandUserid(user.id, credential.title);
    if(titleAlreadyinUse){
        throw {type: "conflict", message: "Title already in use"};
    }

    const {password} = credential;
    const credentialData = {...credential, password: cryptr.encrypt(password)};
    await credentialRepository.insertCredential(user.id, credentialData);
}

export async function getCredentials(userId: number){
    const credentials = await credentialRepository.findAllCredentialsByUserID(userId);
    
    credentials.forEach(credential => {
        credential.password = cryptr.decrypt(credential.password)
    });
    return credentials
}

export async function getSpecificCredential(userId: number, credentialId: number){
    const credential = await credentialRepository.findCredentialByIdAndUserId(userId, credentialId);
    if(!credential){
        throw {type: "not_found", message: "Not found a credential for this id"};
    }

    return {...credential, password: cryptr.decrypt(credential.password)};

}

export async function deleteCredential(user: User, credentialId: number){
    const credential = await getSpecificCredential(user.id, credentialId);
    validateCredential(credential.userId, user.id);
    
    await credentialRepository.deleteCredential(credentialId);
}

function validateCredential(credentialUserid: number, userId: number){
    if(credentialUserid !== userId){
        throw { type: "unauthorized", message: "This credential is not yours"};
    }
}