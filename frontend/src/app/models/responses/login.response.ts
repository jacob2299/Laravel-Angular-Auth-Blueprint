import { UserResponse } from './user.response';

export interface LoginResponse {
  token: string;
  user: UserResponse;
}
