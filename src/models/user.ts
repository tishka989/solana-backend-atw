export interface UserProfile {
  wallet: string;
  name?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileInput {
  name?: string;
  email?: string;
}
