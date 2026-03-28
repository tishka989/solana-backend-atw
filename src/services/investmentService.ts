import { investments } from "../data/store.js";
import { assets } from "../data/store.js";
import { Investment, CreateInvestmentInput } from "../models/investment.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";

export const getInvestments = async (
  filter: Partial<Pick<Investment, "walletAddress" | "assetId">> = {}
): Promise<Investment[]> => {
  return investments.filter((investment) => {
    if (filter.walletAddress && investment.walletAddress !== filter.walletAddress)
      return false;
    if (filter.assetId && investment.assetId !== filter.assetId) return false;
    return true;
  });
};

export const createInvestment = async (
  input: CreateInvestmentInput
): Promise<Investment> => {
  const asset = assets.find((item) => item.id === input.assetId);
  if (!asset) throw new AppError("Asset not found", 404);

  const updatedTokensSold = asset.tokensSold + input.tokensReceived;
  if (updatedTokensSold > asset.totalSupply)
    throw new AppError("Investment exceeds available tokens", 400);

  asset.tokensSold = updatedTokensSold;

  const investment: Investment = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString()
  };

  investments.push(investment);
  return investment;
};
