import { Request, Response } from "express";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetById,
  updateAsset
} from "../services/assetService.js";
import { validateAssetInput } from "../utils/validation.js";

export const getAssetsHandler = async (req: Request, res: Response) => {
  const query = req.query;
  const city = typeof query.city === "string" ? query.city : undefined;
  const status = typeof query.status === "string" ? query.status : undefined;
  const minPrice = typeof query.minPrice === "string" ? Number(query.minPrice) : undefined;
  const maxPrice = typeof query.maxPrice === "string" ? Number(query.maxPrice) : undefined;
  const rooms = typeof query.rooms === "string" ? Number(query.rooms) : undefined;
  const sort = typeof query.sort === "string" ? query.sort : undefined;
  const order = typeof query.order === "string" ? query.order : undefined;

  const assets = await getAllAssets({
    city,
    status: status as any,
    minPrice: Number.isFinite(minPrice) ? minPrice : undefined,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : undefined,
    rooms: Number.isInteger(rooms) ? rooms : undefined,
    sort: sort as any,
    order: order === "desc" ? "desc" : "asc"
  });
  res.status(200).json(assets);
};

export const getAssetByIdHandler = async (req: Request, res: Response) => {
  const asset = await getAssetById(String(req.params.id));
  res.status(200).json(asset);
};

export const createAssetHandler = async (req: Request, res: Response) => {
  const payload = validateAssetInput(req.body);
  const asset = await createAsset(payload);
  res.status(201).json(asset);
};

export const updateAssetHandler = async (req: Request, res: Response) => {
  const payload = validateAssetInput(req.body);
  const updated = await updateAsset(String(req.params.id), payload);
  res.status(200).json(updated);
};

export const deleteAssetHandler = async (req: Request, res: Response) => {
  await deleteAsset(String(req.params.id));
  res.status(204).send();
};
