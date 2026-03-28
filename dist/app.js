import "dotenv/config";
import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import assetRoutes from "./routes/assetRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swapRoutes from "./routes/swapRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/logger.js";
const app = express();
const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/uploads", express.static(uploadFolder));
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
            listings: ["GET /listings", "POST /listings", "DELETE /listings/:id"],
            investments: [
                "GET /investments?wallet=<address>",
                "GET /investments?assetId=<id>",
                "POST /investments"
            ],
            users: ["GET /users/:wallet", "PUT /users/:wallet"],
            swaps: ["GET /swaps?wallet=<address>", "POST /swaps"],
            upload: ["POST /upload"],
            stats: ["GET /stats"]
        },
        notes: [
            "This API stores metadata only.",
            "Token ownership and transfers are handled on Solana."
        ]
    });
});
app.use("/assets", assetRoutes);
app.use("/listings", listingRoutes);
app.use("/investments", investmentRoutes);
app.use("/users", userRoutes);
app.use("/swaps", swapRoutes);
app.use("/stats", statsRoutes);
app.use("/upload", uploadRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
