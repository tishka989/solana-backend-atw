import { assets } from "../data/store.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";
export const getAllAssets = async () => assets;
export const getAssetById = async (id) => {
    const asset = assets.find((item) => item.id === id);
    if (!asset)
        throw new AppError("Asset not found", 404);
    return asset;
};
export const createAsset = async (input) => {
    const asset = {
        id: generateId(),
        ...input,
        createdAt: new Date().toISOString()
    };
    assets.push(asset);
    return asset;
};
export const updateAsset = async (id, input) => {
    const index = assets.findIndex((item) => item.id === id);
    if (index < 0)
        throw new AppError("Asset not found", 404);
    const updated = {
        ...assets[index],
        ...input
    };
    assets[index] = updated;
    return updated;
};
export const deleteAsset = async (id) => {
    const index = assets.findIndex((item) => item.id === id);
    if (index < 0)
        throw new AppError("Asset not found", 404);
    assets.splice(index, 1);
};
