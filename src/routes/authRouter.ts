import { Router } from "express";
import { createUser, login } from "../controllers/userController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(userSchema), createUser);
authRouter.post("/signin", validateSchemaMiddleware(userSchema), login);

export default authRouter;