import { Router } from "express";
import { createNote, deleteNote, getNote, getNotes } from "../controllers/notesController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { noteSchema } from "../schemas/noteSchema.js";

const notesRouter = Router();

notesRouter.post("/notes", validateToken, validateSchemaMiddleware(noteSchema), createNote);
notesRouter.get("/notes", validateToken, getNotes);
notesRouter.get("/note/:id", validateToken, getNote);
notesRouter.delete("/notes/:id", validateToken, deleteNote);

export default notesRouter;