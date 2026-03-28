import { assets } from "../data/store.js";
import { Asset, CreateAssetInput } from "../models/asset.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";

export type AssetQueryParams = {
  city?: string;
  status?: Asset["status"];
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  sort?: keyof Asset;
  order?: "asc" | "desc";
};

export const getAllAssets = async (
  params: AssetQueryParams = {}
): Promise<Asset[]> => {
  let result = [...assets];

  if (params.city) {
    const city = params.city.trim().toLowerCase();
    result = result.filter((asset) =>
      asset.location.toLowerCase().includes(city)
    );
  }

  if (params.status) {
    result = result.filter((asset) => asset.status === params.status);
  }

  if (typeof params.minPrice === "number") {
    result = result.filter((asset) => asset.pricePerToken >= params.minPrice!);
  }

  if (typeof params.maxPrice === "number") {
    result = result.filter((asset) => asset.pricePerToken <= params.maxPrice!);
  }

  if (typeof params.rooms === "number") {
    result = result.filter((asset) => asset.rooms === params.rooms);
  }

  if (params.sort) {
    const order = params.order === "desc" ? -1 : 1;
    result.sort((a, b) => {
      const left = a[params.sort!];
      const right = b[params.sort!];
      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right) * order;
      }
      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * order;
      }
      return 0;
    });
  }

  return result;
};

export const getAssetById = async (id: string): Promise<Asset> => {
  const asset = assets.find((item) => item.id === id);
  if (!asset) throw new AppError("Asset not found", 404);
  return asset;
};

export const createAsset = async (input: CreateAssetInput): Promise<Asset> => {
  const asset: Asset = {
    id: generateId(),
    ...input,
    image: input.images[0],
    createdAt: new Date().toISOString()
  };
  assets.push(asset);
  return asset;
};

export const updateAsset = async (
  id: string,
  input: CreateAssetInput
): Promise<Asset> => {
  const index = assets.findIndex((item) => item.id === id);
  if (index < 0) throw new AppError("Asset not found", 404);

  const updated: Asset = {
    ...assets[index],
    ...input,
    image: input.images[0]
  };
  assets[index] = updated;
  return updated;
};

export const deleteAsset = async (id: string): Promise<void> => {
  const index = assets.findIndex((item) => item.id === id);
  if (index < 0) throw new AppError("Asset not found", 404);
  assets.splice(index, 1);
};
