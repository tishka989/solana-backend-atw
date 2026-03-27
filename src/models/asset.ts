export interface Asset {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  pricePerToken: number;
  totalSupply: number;
  tokenMint: string;
  createdAt: string;
}

export interface CreateAssetInput {
  name: string;
  description: string;
  image: string;
  location: string;
  pricePerToken: number;
  totalSupply: number;
  tokenMint: string;
}
