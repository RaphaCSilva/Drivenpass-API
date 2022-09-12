import { Request, Response } from "express";
import * as credentalService from "../services/credentalService.js";

export async function createCredential(req: Request, res: Response) {
    const { user } = res.locals;
    res.status(201).send(user);
}

export async function getCredentials(req: Request, res: Response) {
    const { user } = res.locals;
    const credentials = await credentalService.getCredentials(user.id);

    res.status(200).send(credentials)
}

export async function getCredential(req: Request, res: Response) {
    
}

export async function deleteCredential(req: Request, res: Response){

}