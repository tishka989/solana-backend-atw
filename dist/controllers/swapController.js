import { getSwaps, createSwap, swapsToHistoryItems } from "../services/swapService.js";
import { validateSwapInput } from "../utils/validation.js";
export const getSwapsHandler = async (req, res) => {
    const wallet = typeof req.query.wallet === "string" ? req.query.wallet : undefined;
    const swaps = wallet?.trim() ? await getSwaps(wallet) : [];
    res.status(200).json(swapsToHistoryItems(swaps));
};
export const createSwapHandler = async (req, res) => {
    const payload = validateSwapInput(req.body);
    const swap = await createSwap(payload);
    res.status(201).json(swap);
};
