import { Request, Response } from "express";
import { AppError } from "../utils/errors.js";

export const uploadFileHandler = async (req: Request, res: Response) => {
  const file = (req as Request & { file?: { filename: string } }).file;
  if (!file) throw new AppError("File upload failed", 400);
  const proto =
    (req.get("x-forwarded-proto") ?? req.protocol).split(",")[0]?.trim() ??
    req.protocol;
  const host = req.get("host");
  if (!host) throw new AppError("Cannot build upload URL", 500);
  const url = `${proto}://${host}/uploads/${file.filename}`;
  res.status(201).json({ url });
};
