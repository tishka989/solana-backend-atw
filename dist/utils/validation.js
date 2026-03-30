import { AppError } from "./errors.js";
const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
const isPositiveNumber = (value) => typeof value === "number" && Number.isFinite(value) && value > 0;
const isNonNegativeInteger = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && Number.isInteger(value);
const isPositiveInteger = (value) => isPositiveNumber(value) && Number.isInteger(value);
const isLikelySolanaAddress = (value) => /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const statusValues = ["upcoming", "active", "funded", "completed"];
const propertyTypeValues = ["apartment", "house", "commercial", "land"];
export const validateAssetInput = (payload) => {
    const input = payload;
    if (!isNonEmptyString(input.name))
        throw new AppError("name is required");
    if (!isNonEmptyString(input.description))
        throw new AppError("description is required");
    if (!Array.isArray(input.images) || input.images.length === 0)
        throw new AppError("images must be a non-empty array of URLs");
    if (!input.images.every(isNonEmptyString))
        throw new AppError("each image URL must be a non-empty string");
    if (!isNonEmptyString(input.location))
        throw new AppError("location is required");
    if (!isPositiveNumber(input.pricePerToken))
        throw new AppError("pricePerToken must be a positive number");
    if (!isPositiveNumber(input.totalSupply))
        throw new AppError("totalSupply must be a positive number");
    if (!Number.isInteger(input.totalSupply))
        throw new AppError("totalSupply must be an integer");
    if (!isPositiveNumber(input.area))
        throw new AppError("area must be a positive number");
    if (!isPositiveInteger(input.rooms))
        throw new AppError("rooms must be a positive integer");
    if (!isNonNegativeInteger(input.floor))
        throw new AppError("floor must be a non-negative integer");
    if (!isPositiveInteger(input.totalFloors))
        throw new AppError("totalFloors must be a positive integer");
    if (!isPositiveInteger(input.yearBuilt))
        throw new AppError("yearBuilt must be a valid year");
    if (!isNonEmptyString(input.developer))
        throw new AppError("developer is required");
    if (typeof input.roi !== "number" || !Number.isFinite(input.roi) || input.roi < 0)
        throw new AppError("roi must be a non-negative number");
    if (!isValidStatus(input.status))
        throw new AppError("status must be one of upcoming, active, funded, completed");
    if (!isValidPropertyType(input.propertyType))
        throw new AppError("propertyType must be one of apartment, house, commercial, land");
    if (!isNonNegativeInteger(input.tokensSold))
        throw new AppError("tokensSold must be a non-negative integer");
    if (input.tokensSold > input.totalSupply)
        throw new AppError("tokensSold cannot exceed totalSupply");
    if (!isNonEmptyString(input.tokenMint))
        throw new AppError("tokenMint is required");
    if (!isLikelySolanaAddress(input.tokenMint))
        throw new AppError("tokenMint must be a valid Solana address format");
    return {
        name: input.name.trim(),
        description: input.description.trim(),
        images: input.images.map((image) => image.trim()),
        location: input.location.trim(),
        area: input.area,
        rooms: input.rooms,
        floor: input.floor,
        totalFloors: input.totalFloors,
        yearBuilt: input.yearBuilt,
        developer: input.developer.trim(),
        roi: input.roi,
        status: input.status,
        propertyType: input.propertyType,
        tokensSold: input.tokensSold,
        pricePerToken: input.pricePerToken,
        totalSupply: input.totalSupply,
        tokenMint: input.tokenMint.trim()
    };
};
const isValidStatus = (value) => isNonEmptyString(value) && statusValues.includes(value);
const isValidPropertyType = (value) => isNonEmptyString(value) && propertyTypeValues.includes(value);
export const validateListingInput = (payload) => {
    const input = payload;
    if (!isNonEmptyString(input.assetId))
        throw new AppError("assetId is required");
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
export const validateInvestmentInput = (payload) => {
    const input = payload;
    if (!isNonEmptyString(input.assetId))
        throw new AppError("assetId is required");
    if (!isNonEmptyString(input.walletAddress))
        throw new AppError("walletAddress is required");
    if (!isLikelySolanaAddress(input.walletAddress))
        throw new AppError("walletAddress must be a valid Solana address format");
    if (!isPositiveNumber(input.amount))
        throw new AppError("amount must be a positive number");
    if (!isPositiveNumber(input.tokensReceived))
        throw new AppError("tokensReceived must be a positive number");
    if (input.txHash !== undefined &&
        input.txHash !== null &&
        !isNonEmptyString(input.txHash))
        throw new AppError("txHash must be a non-empty string when provided");
    return {
        assetId: input.assetId.trim(),
        walletAddress: input.walletAddress.trim(),
        amount: input.amount,
        tokensReceived: input.tokensReceived,
        txHash: isNonEmptyString(input.txHash) ? input.txHash.trim() : undefined
    };
};
export const validateUserProfileInput = (payload) => {
    const input = payload;
    if (input.name !== undefined && !isNonEmptyString(input.name))
        throw new AppError("name must be a non-empty string");
    if (input.email !== undefined && !isNonEmptyString(input.email))
        throw new AppError("email must be a non-empty string");
    if (input.email !== undefined && !isValidEmail(input.email))
        throw new AppError("email must be valid");
    if (input.name === undefined && input.email === undefined)
        throw new AppError("At least one field (name, email) is required");
    return {
        name: input.name?.trim(),
        email: input.email?.trim()
    };
};
const swapStableTokens = ["USDT", "USDS"];
export const validateSwapInput = (payload) => {
    const input = payload;
    if (!isNonEmptyString(input.wallet))
        throw new AppError("wallet is required");
    if (!isLikelySolanaAddress(input.wallet))
        throw new AppError("wallet must be a valid Solana address format");
    if (!isNonEmptyString(input.fromToken))
        throw new AppError("fromToken is required");
    if (!isNonEmptyString(input.toToken))
        throw new AppError("toToken is required");
    if (!isPositiveNumber(input.amountIn))
        throw new AppError("amountIn must be a positive number");
    if (!isPositiveNumber(input.amountOut))
        throw new AppError("amountOut must be a positive number");
    if (!isNonEmptyString(input.txHash))
        throw new AppError("txHash is required");
    const fromToken = input.fromToken.trim().toUpperCase();
    const toToken = input.toToken.trim().toUpperCase();
    if (!swapStableTokens.includes(fromToken))
        throw new AppError("fromToken must be USDT or USDS", 400);
    if (toToken !== "SOL")
        throw new AppError("toToken must be SOL", 400);
    return {
        wallet: input.wallet.trim(),
        fromToken,
        toToken,
        amountIn: input.amountIn,
        amountOut: input.amountOut,
        txHash: input.txHash.trim()
    };
};
