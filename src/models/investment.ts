export interface Investment {
  id: string;
  assetId: string;
  walletAddress: string;
  amount: number;
  tokensReceived: number;
  txHash: string;
  createdAt: string;
}

export interface CreateInvestmentInput {
  assetId: string;
  walletAddress: string;
  amount: number;
  tokensReceived: number;
  /** Optional; generated if omitted. */
  txHash?: string;
}
