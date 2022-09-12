import { Router } from "express";
import { createWifi, deleteWifi, getWifi, getWifis } from "../controllers/wifiController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { wifiSchema } from "../schemas/wifiShcema.js";

const wifiRouter = Router();

wifiRouter.post("/wifis", validateToken, validateSchemaMiddleware(wifiSchema), createWifi);
wifiRouter.get("/wifis", validateToken, getWifis);
wifiRouter.get("/wifi/:id", validateToken, getWifi);
wifiRouter.delete("/wifi/:id", validateToken, deleteWifi);

export default wifiRouter;