import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { signinSchema } from "../schemas/signinSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(signinSchema));
authRouter.post("/signin", validateSchemaMiddleware(signinSchema));

export default authRouter;