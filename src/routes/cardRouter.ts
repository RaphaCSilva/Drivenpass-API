import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { cardSchema } from "../schemas/cardSchema.js";
import { createCard, getCard, getCards } from "../controllers/cardsController.js";

const cardRouter = Router();

cardRouter.post("/cards", validateToken, validateSchemaMiddleware(cardSchema), createCard);
cardRouter.get("/cards", validateToken, getCards);
cardRouter.get("/card/:id", validateToken, getCard);
cardRouter.delete("/card/:id", validateToken);

export default cardRouter;