import { CreateAssetInput } from "../models/asset.js";
import { CreateListingInput } from "../models/listing.js";
import { AppError } from "./errors.js";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isPositiveNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const isLikelySolanaAddress = (value: string): boolean =>
  /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);

export const validateAssetInput = (payload: unknown): CreateAssetInput => {
  const input = payload as Partial<CreateAssetInput>;

  if (!isNonEmptyString(input.name)) throw new AppError("name is required");
  if (!isNonEmptyString(input.description))
    throw new AppError("description is required");
  if (!isNonEmptyString(input.image)) throw new AppError("image is required");
  if (!isNonEmptyString(input.location))
    throw new AppError("location is required");
  if (!isPositiveNumber(input.pricePerToken))
    throw new AppError("pricePerToken must be a positive number");
  if (!isPositiveNumber(input.totalSupply))
    throw new AppError("totalSupply must be a positive number");
  if (!Number.isInteger(input.totalSupply))
    throw new AppError("totalSupply must be an integer");
  if (!isNonEmptyString(input.tokenMint))
    throw new AppError("tokenMint is required");
  if (!isLikelySolanaAddress(input.tokenMint))
    throw new AppError("tokenMint must be a valid Solana address format");

  return {
    name: input.name.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    location: input.location.trim(),
    pricePerToken: input.pricePerToken,
    totalSupply: input.totalSupply,
    tokenMint: input.tokenMint.trim()
  };
};

export const validateListingInput = (payload: unknown): CreateListingInput => {
  const input = payload as Partial<CreateListingInput>;

  if (!isNonEmptyString(input.assetId)) throw new AppError("assetId is required");
  if (!isNonEmptyString(input.sellerWallet))
    throw new AppError("sellerWallet is required");
  if (!isPositiveNumber(input.amount))
    throw new AppError("amount must be a positive number");
  if (!Number.isInteger(input.amount))
    throw new AppError("amount must be an integer");
  if (!isPositiveNumber(input.pricePerToken))
    throw new AppError("pricePerToken must be a positive number");

  return {
    assetId: input.assetId.trim(),
    sellerWallet: input.sellerWallet.trim(),
    amount: input.amount,
    pricePerToken: input.pricePerToken
  };
};
