import { createAsset, deleteAsset, getAllAssets, getAssetById, updateAsset } from "../services/assetService.js";
import { validateAssetInput } from "../utils/validation.js";
export const getAssetsHandler = async (_req, res) => {
    const assets = await getAllAssets();
    res.status(200).json(assets);
};
export const getAssetByIdHandler = async (req, res) => {
    const asset = await getAssetById(String(req.params.id));
    res.status(200).json(asset);
};
export const createAssetHandler = async (req, res) => {
    const payload = validateAssetInput(req.body);
    const asset = await createAsset(payload);
    res.status(201).json(asset);
};
export const updateAssetHandler = async (req, res) => {
    const payload = validateAssetInput(req.body);
    const updated = await updateAsset(String(req.params.id), payload);
    res.status(200).json(updated);
};
export const deleteAssetHandler = async (req, res) => {
    await deleteAsset(String(req.params.id));
    res.status(204).send();
};
