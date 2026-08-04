export interface User {
  id: string;
  email: string;
  displayName: string;
  plan: 'free' | 'pro' | 'team';
  createdAt: string;
  cognitiveProfileId?: string;
  stripeCustomerId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
