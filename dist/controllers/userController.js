import { getOrCreateUser, updateUserProfile } from "../services/userService.js";
import { validateUserProfileInput } from "../utils/validation.js";
export const getUserHandler = async (req, res) => {
    const wallet = String(req.params.wallet);
    const user = await getOrCreateUser(wallet);
    res.status(200).json(user);
};
export const updateUserHandler = async (req, res) => {
    const wallet = String(req.params.wallet);
    const payload = validateUserProfileInput(req.body);
    const user = await updateUserProfile(wallet, payload);
    res.status(200).json(user);
};
