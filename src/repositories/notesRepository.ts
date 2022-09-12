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

export async function findAllNotesByUserID(userId: number){
    return prisma.note.findMany({
        where: {userId}
    });
}

export async function findNoteByIdAndUserId(userId: number, noteId: number){
    return prisma.note.findFirst({
        where: {
            userId, 
            id: noteId
        }
    });
}

export async function deleteNote(id: number){
    return prisma.note.delete({ where: {id} });
}