import { Request, Response } from "express";
import {
  createListing,
  deleteListing,
  getAllListings
} from "../services/listingService.js";
import { validateListingInput } from "../utils/validation.js";

export const getListingsHandler = async (_req: Request, res: Response) => {
  const listings = await getAllListings();
  res.status(200).json(listings);
};

export const createListingHandler = async (req: Request, res: Response) => {
  const payload = validateListingInput(req.body);
  const listing = await createListing(payload);
  res.status(201).json(listing);
};

export const deleteListingHandler = async (req: Request, res: Response) => {
  await deleteListing(String(req.params.id));
  res.status(204).send();
};
