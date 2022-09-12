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