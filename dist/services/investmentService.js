import { investments } from "../data/store.js";
import { assets } from "../data/store.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";
export const getInvestments = async (filter = {}) => {
    return investments.filter((investment) => {
        if (filter.walletAddress && investment.walletAddress !== filter.walletAddress)
            return false;
        if (filter.assetId && investment.assetId !== filter.assetId)
            return false;
        return true;
    });
};
export const createInvestment = async (input) => {
    const asset = assets.find((item) => item.id === input.assetId);
    if (!asset)
        throw new AppError("Asset not found", 404);
    const updatedTokensSold = asset.tokensSold + input.tokensReceived;
    if (updatedTokensSold > asset.totalSupply)
        throw new AppError("Investment exceeds available tokens", 400);
    asset.tokensSold = updatedTokensSold;
    const investment = {
        id: generateId(),
        ...input,
        createdAt: new Date().toISOString()
    };
    investments.push(investment);
    return investment;
};
