import { prisma } from "../config/database.js";
import { CreateNoteData } from "../services/notesService.js";


export async function getNoteByTitleandUserid(userId: number, title: string){
    return prisma.note.findFirst({
        where: {
            userId,
            title
        }
    });
}

export async function insertNote(userId: number, note: CreateNoteData){
    return prisma.note.create({
        data: {...note, userId}
    });
}