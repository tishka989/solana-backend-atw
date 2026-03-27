import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({ error: "Internal server error" });
};
