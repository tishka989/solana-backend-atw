export interface Swap {
  id: string;
  wallet: string;
  fromToken: string;
  toToken: string;
  amountIn: number;
  amountOut: number;
  txHash: string;
  createdAt: string;
}

export interface CreateSwapInput {
  wallet: string;
  fromToken: string;
  toToken: string;
  amountIn: number;
  amountOut: number;
  txHash: string;
}
