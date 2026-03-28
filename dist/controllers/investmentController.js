import { createInvestment, getInvestments } from "../services/investmentService.js";
import { validateInvestmentInput } from "../utils/validation.js";
export const getInvestmentsHandler = async (req, res) => {
    const wallet = typeof req.query.wallet === "string" ? req.query.wallet : undefined;
    const assetId = typeof req.query.assetId === "string" ? req.query.assetId : undefined;
    const investments = await getInvestments({ walletAddress: wallet, assetId });
    res.status(200).json(investments);
};
export const createInvestmentHandler = async (req, res) => {
    const payload = validateInvestmentInput(req.body);
    const investment = await createInvestment(payload);
    res.status(201).json(investment);
};
