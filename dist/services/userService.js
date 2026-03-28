import { users } from "../data/store.js";
export const getOrCreateUser = async (wallet) => {
    const normalizedWallet = wallet.trim();
    let user = users.find((item) => item.wallet === normalizedWallet);
    if (!user) {
        user = {
            wallet: normalizedWallet,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        users.push(user);
    }
    return user;
};
export const updateUserProfile = async (wallet, input) => {
    const normalizedWallet = wallet.trim();
    let user = users.find((item) => item.wallet === normalizedWallet);
    if (!user) {
        user = {
            wallet: normalizedWallet,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...input
        };
        users.push(user);
        return user;
    }
    const updatedUser = {
        ...user,
        name: input.name !== undefined ? input.name : user.name,
        email: input.email !== undefined ? input.email : user.email,
        updatedAt: new Date().toISOString()
    };
    const index = users.findIndex((item) => item.wallet === normalizedWallet);
    users[index] = updatedUser;
    return updatedUser;
};
