export interface Asset {
  id: string;
  name: string;
  description: string;
  image: string;
  images: string[];
  location: string;
  area: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  developer: string;
  roi: number;
  status: "upcoming" | "active" | "funded" | "completed";
  propertyType: "apartment" | "house" | "commercial" | "land";
  tokensSold: number;
  pricePerToken: number;
  totalSupply: number;
  tokenMint: string;
  createdAt: string;
}

export interface CreateAssetInput {
  name: string;
  description: string;
  images: string[];
  location: string;
  area: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  developer: string;
  roi: number;
  status: "upcoming" | "active" | "funded" | "completed";
  propertyType: "apartment" | "house" | "commercial" | "land";
  tokensSold: number;
  pricePerToken: number;
  totalSupply: number;
  tokenMint: string;
}
