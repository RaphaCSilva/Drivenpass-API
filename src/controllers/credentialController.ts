import { Request, Response } from "express";
import * as credentalService from "../services/credentalService.js";

export async function createCredential(req: Request, res: Response) {
    const { user } = res.locals;
    const credential = req.body;
    await credentalService.createCredential(user, credential);
    
    res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
    const { user } = res.locals;
    const credentials = await credentalService.getCredentials(user.id);

    res.status(200).send(credentials)
}

export async function getCredential(req: Request, res: Response) {
    const { user } = res.locals;
    const credentialId = parseInt(req.params.id);
    if(credentialId === NaN){
        res.sendStatus(422);
    }

    const credential = await credentalService.getSpecificCredential(user.id, credentialId);
    res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response){
    const { user } = res.locals;
    const credentialId = parseInt(req.params.id);
    if(credentialId === NaN){
        res.sendStatus(422);
    }

    await credentalService.deleteCredential(user, credentialId);
    res.sendStatus(200);
}