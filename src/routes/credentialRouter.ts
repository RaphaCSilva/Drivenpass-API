import { Router } from "express";
import { createCredential, deleteCredential, getCredential, getCredentials } from "../controllers/credentialController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialRouter = Router();



credentialRouter.post("/credential", validateToken, validateSchemaMiddleware(credentialSchema), createCredential);
credentialRouter.get("/credentials", validateToken, getCredentials);
credentialRouter.get("/credential/:id", validateToken, getCredential);
credentialRouter.delete("/credential/:id", validateToken, deleteCredential)

export default credentialRouter;