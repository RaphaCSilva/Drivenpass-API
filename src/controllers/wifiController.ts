import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
    const { user } = res.locals;
    const wifi = req.body;
    await wifiService.createWifi(user, wifi);

    res.sendStatus(201);
}

export async function getWifis(req: Request, res: Response) {
    const { user } = res.locals;
    const wifis = await wifiService.getWifis(user.id);

    res.status(200).send(wifis)
}

export async function getWifi(req: Request, res: Response) {
    const { user } = res.locals;
    const wifiId = parseInt(req.params.id);
    if(wifiId === NaN){
        res.sendStatus(422);
    }

    const wifi = await wifiService.getSpecificWifi(user.id, wifiId);
    res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response){
    const { user } = res.locals;
    const wifiId = parseInt(req.params.id);
    if(wifiId === NaN){
        res.sendStatus(422);
    }

    await wifiService.deleteWifi(user, wifiId);
    res.sendStatus(200);
}