import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards", validateToken, validateSchemaMiddleware(cardSchema));
cardRouter.get("/cards", validateToken);
cardRouter.get("/card/:id", validateToken);
cardRouter.delete("/card/:id", validateToken);

export default cardRouter;