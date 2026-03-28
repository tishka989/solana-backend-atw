import { Router } from "express";
import { createInvestmentHandler, getInvestmentsHandler } from "../controllers/investmentController.js";
const router = Router();
router.get("/", getInvestmentsHandler);
router.post("/", createInvestmentHandler);
export default router;
