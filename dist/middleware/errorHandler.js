import { AppError } from "../utils/errors.js";
export const notFoundHandler = (req, _res, next) => {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};
export const errorHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
};
