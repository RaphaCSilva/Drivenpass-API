import { User, Note } from "@prisma/client";
import * as notesRepository from "../repositories/notesRepository.js";

export type CreateNoteData = Omit<Note, "id">;

export async function createNote(user: User, note: CreateNoteData){
    const titleAlreadyinUse = await notesRepository.getNoteByTitleandUserid(user.id, note.title);
    if(titleAlreadyinUse){
        throw {type: "conflict", message: "Title already in use"};
    }

    await notesRepository.insertNote(user.id, note);
}

export async function getNotes(userId: number){
    const notes = await notesRepository.findAllNotesByUserID(userId);
    
    return notes;
}

export async function getSpecificNote(userId: number, noteId: number){
    const note = await notesRepository.findNoteByIdAndUserId(userId, noteId);
    if(!note){
        throw {type: "not_found", message: "Not found a note for this id"};
    }

    return note;
}