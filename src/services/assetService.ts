import { assets } from "../data/store.js";
import { Asset, CreateAssetInput } from "../models/asset.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";

export const getAllAssets = async (): Promise<Asset[]> => assets;

export const getAssetById = async (id: string): Promise<Asset> => {
  const asset = assets.find((item) => item.id === id);
  if (!asset) throw new AppError("Asset not found", 404);
  return asset;
};

export const createAsset = async (input: CreateAssetInput): Promise<Asset> => {
  const asset: Asset = {
    id: generateId(),
    ...input,
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
    ...input
  };
  assets[index] = updated;
  return updated;
};

export const deleteAsset = async (id: string): Promise<void> => {
  const index = assets.findIndex((item) => item.id === id);
  if (index < 0) throw new AppError("Asset not found", 404);
  assets.splice(index, 1);
};
