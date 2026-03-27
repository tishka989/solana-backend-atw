export interface Listing {
  id: string;
  assetId: string;
  sellerWallet: string;
  amount: number;
  pricePerToken: number;
  createdAt: string;
}

export interface CreateListingInput {
  assetId: string;
  sellerWallet: string;
  amount: number;
  pricePerToken: number;
}
