import { User } from '../../models/interfaces/user.interface';

export interface AuthState {
  user: User;
  api_token: string;
  isAuthenticated: boolean;
}
