export interface UserProfile {
  wallet: string;
  /** Native / primary token balance */
  balance: number;
  usdt: number;
  usds: number;
  name?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileInput {
  name?: string;
  email?: string;
}
