import { assets, listings } from "../data/store.js";
import { CreateListingInput, Listing } from "../models/listing.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";

export const getAllListings = async (): Promise<Listing[]> => listings;

export const createListing = async (
  input: CreateListingInput
): Promise<Listing> => {
  const assetExists = assets.some((asset) => asset.id === input.assetId);
  if (!assetExists) throw new AppError("assetId does not exist", 400);

  const listing: Listing = {
    id: generateId(),
    ...input,
    createdAt: new Date().toISOString()
  };

  listings.push(listing);
  return listing;
};

export const deleteListing = async (id: string): Promise<void> => {
  const index = listings.findIndex((listing) => listing.id === id);
  if (index < 0) throw new AppError("Listing not found", 404);
  listings.splice(index, 1);
};
