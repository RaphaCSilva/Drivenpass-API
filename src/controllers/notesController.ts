import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNote(req: Request, res: Response) {
    const { user } = res.locals;
    const note = req.body;
    await notesService.createNote(user, note);
    
    res.sendStatus(201);
}

export async function getNotes(req: Request, res: Response) {
    const { user } = res.locals;
    const credentials = await notesService.getNotes(user.id);

    res.status(200).send(credentials)
}

export async function getNote(req: Request, res: Response) {
    const { user } = res.locals;
    const noteId = parseInt(req.params.id);
    if(noteId === NaN){
        res.sendStatus(422);
    }

    const note = await notesService.getSpecificNote(user.id, noteId);
    res.status(200).send(note);
}

export async function deleteNote(req: Request, res: Response) {
    
}