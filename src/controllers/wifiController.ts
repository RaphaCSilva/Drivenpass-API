import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
    const { user } = res.locals;
    const wifi = req.body;
    await wifiService.createWifi(user, wifi);

    res.sendStatus(201);
}

export async function getWifis(req: Request, res: Response) {

}

export async function getWifi(req: Request, res: Response) {

}

export async function deleteWifi(req: Request, res: Response){

}