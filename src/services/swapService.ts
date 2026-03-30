import { swaps } from "../data/store.js";
import { Swap, CreateSwapInput } from "../models/swap.js";
import { generateId } from "../utils/id.js";
import { applySwapToUser } from "./userService.js";

export type SwapHistoryItem = Omit<Swap, "wallet">;

export const getSwaps = async (wallet?: string): Promise<Swap[]> => {
  if (!wallet) return swaps;
  const w = wallet.trim();
  return swaps.filter((swap) => swap.wallet === w);
};

export const swapsToHistoryItems = (items: Swap[]): SwapHistoryItem[] =>
  items.map(({ id, fromToken, toToken, amountIn, amountOut, txHash, createdAt }) => ({
    id,
    fromToken,
    toToken,
    amountIn,
    amountOut,
    txHash,
    createdAt
  }));

export const createSwap = async (input: CreateSwapInput): Promise<Swap> => {
  await applySwapToUser(input.wallet, input.fromToken, input.amountIn, input.amountOut);
  const swap: Swap = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString()
  };
  swaps.push(swap);
  return swap;
};
