import { User, Wifi } from "@prisma/client";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import * as wifiRepository from "../repositories/wifiRepository.js";

dotenv.config();

export type CreateWifiData = Omit<Wifi, "id">;

const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export async function createWifi(user: User, wifi: CreateWifiData){
    const {password} = wifi;
    const wifiData = {...wifi, password: cryptr.encrypt(password)};
    await wifiRepository.insertWifi(user.id, wifiData);
}

export async function getWifis(userId: number){
    const wifis = await wifiRepository.findAllWifisByUserID(userId);
    
    wifis.forEach(wifi => {
        wifi.password = cryptr.decrypt(wifi.password)
    });
    return wifis
}

export async function getSpecificWifi(userId: number, wifiId: number){
    const wifi = await wifiRepository.findWifiByIdAndUserId(userId, wifiId);
    if(!wifi){
        throw {type: "not_found", message: "Not found a wifi for this id"};
    }

    return {...wifi, password: cryptr.decrypt(wifi.password)};

}

export async function deleteWifi(user: User, wifiId: number){
    const wifi = await getSpecificWifi(user.id, wifiId);
    validateWifi(wifi.userId, user.id);
    
    await wifiRepository.deleteWifi(wifiId);
}

function validateWifi(wifiUserid: number, userId: number){
    if(wifiUserid !== userId){
        throw { type: "unauthorized", message: "This wifi is not yours"};
    }
}