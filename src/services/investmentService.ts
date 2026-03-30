import { investments } from "../data/store.js";
import { assets } from "../data/store.js";
import { Investment, CreateInvestmentInput } from "../models/investment.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";
import { debitUserSol } from "./userService.js";

export type InvestmentPortfolioItem = {
  id: string;
  assetId: string;
  amount: number;
  tokensReceived: number;
  status: string;
  purchaseDate: string;
  currentValue: number;
  roi: number;
};

const round1 = (n: number): number => Math.round(n * 10) / 10;

export const toPortfolioItems = (items: Investment[]): InvestmentPortfolioItem[] =>
  items.map((inv) => {
    const asset = assets.find((a) => a.id === inv.assetId);
    const price = asset?.pricePerToken ?? 0;
    const currentValue = round1(inv.tokensReceived * price);
    const cost = inv.amount;
    const roi =
      cost > 0 ? round1(((currentValue - cost) / cost) * 100) : 0;

    return {
      id: inv.id,
      assetId: inv.assetId,
      amount: inv.amount,
      tokensReceived: inv.tokensReceived,
      status: asset?.status ?? "active",
      purchaseDate: inv.createdAt,
      currentValue,
      roi
    };
  });

export const getInvestments = async (
  filter: Partial<Pick<Investment, "walletAddress" | "assetId">> = {}
): Promise<Investment[]> => {
  const wallet = filter.walletAddress?.trim();
  return investments.filter((investment) => {
    if (wallet && investment.walletAddress !== wallet) return false;
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

  await debitUserSol(input.walletAddress.trim(), input.amount);

  asset.tokensSold = updatedTokensSold;

  const investment: Investment = {
    id: generateId(),
    assetId: input.assetId,
    walletAddress: input.walletAddress,
    amount: input.amount,
    tokensReceived: input.tokensReceived,
    txHash: input.txHash ?? `inv_${generateId()}`,
    createdAt: new Date().toISOString()
  };

  investments.push(investment);
  return investment;
};
