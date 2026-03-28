import { getStats } from "../services/statsService.js";
export const getStatsHandler = async (_req, res) => {
    const stats = await getStats();
    res.status(200).json(stats);
};
