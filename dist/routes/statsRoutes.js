import { Router } from "express";
import { getStatsHandler } from "../controllers/statsController.js";
const router = Router();
router.get("/", getStatsHandler);
export default router;
