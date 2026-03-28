import { assets, investments } from "../data/store.js";
export const getStats = async () => {
    const totalInvestors = new Set(investments.map((item) => item.walletAddress)).size;
    const totalInvested = investments.reduce((sum, item) => sum + item.amount, 0);
    const totalProperties = assets.length;
    const averageRoi = assets.length > 0
        ? assets.reduce((sum, item) => sum + item.roi, 0) / assets.length
        : 0;
    return {
        totalInvestors,
        totalInvested,
        totalProperties,
        averageRoi
    };
};
