import { users } from "../data/store.js";
import { UserProfile, UpdateUserProfileInput } from "../models/user.js";
import { AppError } from "../utils/errors.js";
import { generateId } from "../utils/id.js";

export const getOrCreateUser = async (wallet: string): Promise<UserProfile> => {
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

export const updateUserProfile = async (
  wallet: string,
  input: UpdateUserProfileInput
): Promise<UserProfile> => {
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

  const updatedUser: UserProfile = {
    ...user,
    name: input.name !== undefined ? input.name : user.name,
    email: input.email !== undefined ? input.email : user.email,
    updatedAt: new Date().toISOString()
  };

  const index = users.findIndex((item) => item.wallet === normalizedWallet);
  users[index] = updatedUser;
  return updatedUser;
};
