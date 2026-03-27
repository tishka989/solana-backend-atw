import { Router } from "express";
import { createAssetHandler, deleteAssetHandler, getAssetByIdHandler, getAssetsHandler, updateAssetHandler } from "../controllers/assetController.js";
const router = Router();
router.get("/", getAssetsHandler);
router.get("/:id", getAssetByIdHandler);
router.post("/", createAssetHandler);
router.put("/:id", updateAssetHandler);
router.delete("/:id", deleteAssetHandler);
export default router;
