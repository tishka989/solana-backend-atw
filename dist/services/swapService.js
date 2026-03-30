import { swaps } from "../data/store.js";
import { generateId } from "../utils/id.js";
import { applySwapToUser } from "./userService.js";
export const getSwaps = async (wallet) => {
    if (!wallet)
        return swaps;
    const w = wallet.trim();
    return swaps.filter((swap) => swap.wallet === w);
};
export const swapsToHistoryItems = (items) => items.map(({ id, fromToken, toToken, amountIn, amountOut, txHash, createdAt }) => ({
    id,
    fromToken,
    toToken,
    amountIn,
    amountOut,
    txHash,
    createdAt
}));
export const createSwap = async (input) => {
    await applySwapToUser(input.wallet, input.fromToken, input.amountIn, input.amountOut);
    const swap = {
        id: generateId(),
        ...input,
        createdAt: new Date().toISOString()
    };
    swaps.push(swap);
    return swap;
};
