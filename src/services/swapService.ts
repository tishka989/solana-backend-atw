import { swaps } from "../data/store.js";
import { Swap, CreateSwapInput } from "../models/swap.js";
import { generateId } from "../utils/id.js";

export const getSwaps = async (wallet?: string): Promise<Swap[]> => {
  if (!wallet) return swaps;
  return swaps.filter((swap) => swap.wallet === wallet);
};

export const createSwap = async (input: CreateSwapInput): Promise<Swap> => {
  const swap: Swap = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString()
  };
  swaps.push(swap);
  return swap;
};
