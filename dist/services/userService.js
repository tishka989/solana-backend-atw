import { users } from "../data/store.js";
import { AppError } from "../utils/errors.js";
export const DEFAULT_USER_BALANCES = {
    balance: 0,
    usdt: 1000,
    usds: 500
};
const patchLegacyBalances = (user) => {
    if (typeof user.balance === "number" &&
        typeof user.usdt === "number" &&
        typeof user.usds === "number") {
        return user;
    }
    const now = new Date().toISOString();
    const patched = {
        ...user,
        balance: typeof user.balance === "number" ? user.balance : DEFAULT_USER_BALANCES.balance,
        usdt: typeof user.usdt === "number" ? user.usdt : DEFAULT_USER_BALANCES.usdt,
        usds: typeof user.usds === "number" ? user.usds : DEFAULT_USER_BALANCES.usds,
        updatedAt: now
    };
    const index = users.findIndex((item) => item.wallet === user.wallet);
    if (index >= 0)
        users[index] = patched;
    return patched;
};
export const getOrCreateUser = async (wallet) => {
    const normalizedWallet = wallet.trim();
    let user = users.find((item) => item.wallet === normalizedWallet);
    if (!user) {
        const now = new Date().toISOString();
        user = {
            wallet: normalizedWallet,
            ...DEFAULT_USER_BALANCES,
            createdAt: now,
            updatedAt: now
        };
        users.push(user);
        return user;
    }
    return patchLegacyBalances(user);
};
export const updateUserProfile = async (wallet, input) => {
    const normalizedWallet = wallet.trim();
    let user = users.find((item) => item.wallet === normalizedWallet);
    if (!user) {
        const now = new Date().toISOString();
        user = {
            wallet: normalizedWallet,
            ...DEFAULT_USER_BALANCES,
            createdAt: now,
            updatedAt: now,
            ...input
        };
        users.push(user);
        return user;
    }
    const base = patchLegacyBalances(user);
    const updatedUser = {
        ...base,
        name: input.name !== undefined ? input.name : base.name,
        email: input.email !== undefined ? input.email : base.email,
        updatedAt: new Date().toISOString()
    };
    const index = users.findIndex((item) => item.wallet === normalizedWallet);
    users[index] = updatedUser;
    return updatedUser;
};
/** USDT/USDS → SOL: subtract stable, add SOL to `balance`. */
export const applySwapToUser = async (wallet, fromToken, amountIn, amountOut) => {
    const user = await getOrCreateUser(wallet);
    const ft = fromToken.trim().toUpperCase();
    if (ft === "USDT") {
        if (user.usdt < amountIn)
            throw new AppError("Insufficient USDT balance", 400);
        user.usdt -= amountIn;
    }
    else if (ft === "USDS") {
        if (user.usds < amountIn)
            throw new AppError("Insufficient USDS balance", 400);
        user.usds -= amountIn;
    }
    else {
        throw new AppError("fromToken must be USDT or USDS", 400);
    }
    user.balance += amountOut;
    user.updatedAt = new Date().toISOString();
};
export const debitUserSol = async (wallet, amount) => {
    const user = await getOrCreateUser(wallet);
    if (user.balance < amount)
        throw new AppError("Insufficient SOL balance", 400);
    user.balance -= amount;
    user.updatedAt = new Date().toISOString();
};
