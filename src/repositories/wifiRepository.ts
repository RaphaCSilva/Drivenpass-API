import { prisma } from "../config/database.js";
import { CreateWifiData } from "../services/wifiService.js";


export async function insertWifi(userId: number, wifi: CreateWifiData){
    return prisma.wifi.create({
        data: {...wifi, userId}
    });
}

export async function findAllWifisByUserID(userId: number){
    return prisma.wifi.findMany({
        where: {userId}
    });
}

export async function findWifiByIdAndUserId(userId: number, wifiId: number){
    return prisma.wifi.findFirst({
        where: {
            userId, 
            id: wifiId
        }
    });
}

export async function deleteWifi(id: number){
    return prisma.wifi.delete({ where: {id} });
}