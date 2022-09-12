import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNote(req: Request, res: Response) {
    const { user } = res.locals;
    const note = req.body;
    await notesService.createNote(user, note);
    
    res.sendStatus(201);
}

export async function getNotes(req: Request, res: Response) {
    
}

export async function getNote(req: Request, res: Response) {
    
}

export async function deleteNote(req: Request, res: Response) {
    
}