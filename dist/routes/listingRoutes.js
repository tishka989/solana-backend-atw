import { Router } from "express";
import { createListingHandler, deleteListingHandler, getListingsHandler } from "../controllers/listingController.js";
const router = Router();
router.get("/", getListingsHandler);
router.post("/", createListingHandler);
router.delete("/:id", deleteListingHandler);
export default router;
