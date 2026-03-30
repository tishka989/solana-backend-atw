import { Request, Response } from "express";
import {
  createInvestment,
  getInvestments,
  toPortfolioItems
} from "../services/investmentService.js";
import { validateInvestmentInput } from "../utils/validation.js";

export const getInvestmentsHandler = async (req: Request, res: Response) => {
  const wallet = typeof req.query.wallet === "string" ? req.query.wallet : undefined;
  const assetId = typeof req.query.assetId === "string" ? req.query.assetId : undefined;
  const investments = await getInvestments({ walletAddress: wallet, assetId });
  res.status(200).json(toPortfolioItems(investments));
};

export const createInvestmentHandler = async (req: Request, res: Response) => {
  const payload = validateInvestmentInput(req.body);
  const investment = await createInvestment(payload);
  res.status(201).json(investment);
};
