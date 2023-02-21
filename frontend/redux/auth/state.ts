import { User } from '@/models/User';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: null,
};
