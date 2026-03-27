import "dotenv/config";
import cors from "cors";
import express from "express";
import assetRoutes from "./routes/assetRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/logger.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Web3 real estate metadata API is running",
        docs: "/docs"
    });
});
app.get("/docs", (_req, res) => {
    res.status(200).json({
        endpoints: {
            assets: [
                "GET /assets",
                "GET /assets/:id",
                "POST /assets",
                "PUT /assets/:id",
                "DELETE /assets/:id"
            ],
            listings: ["GET /listings", "POST /listings", "DELETE /listings/:id"]
        },
        notes: [
            "This API stores metadata only.",
            "Token ownership and transfers are handled on Solana."
        ]
    });
});
app.use("/assets", assetRoutes);
app.use("/listings", listingRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
