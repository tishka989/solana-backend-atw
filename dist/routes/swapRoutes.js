import { Router } from "express";
import { createSwapHandler, getSwapsHandler } from "../controllers/swapController.js";
const router = Router();
router.get("/", getSwapsHandler);
router.post("/", createSwapHandler);
export default router;
