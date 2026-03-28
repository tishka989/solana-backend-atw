import { Request, Response } from "express";
import { getStats } from "../services/statsService.js";

export const getStatsHandler = async (_req: Request, res: Response) => {
  const stats = await getStats();
  res.status(200).json(stats);
};
