import { swaps } from "../data/store.js";
import { generateId } from "../utils/id.js";
export const getSwaps = async (wallet) => {
    if (!wallet)
        return swaps;
    return swaps.filter((swap) => swap.wallet === wallet);
};
export const createSwap = async (input) => {
    const swap = {
        id: generateId(),
        ...input,
        createdAt: new Date().toISOString()
    };
    swaps.push(swap);
    return swap;
};
