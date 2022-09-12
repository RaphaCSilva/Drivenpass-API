import { prisma } from "../config/database.js";
import { CreateWifiData } from "../services/wifiService.js";


export async function insertWifi(userId: number, wifi: CreateWifiData){
    return prisma.wifi.create({
        data: {...wifi, userId}
    });
}