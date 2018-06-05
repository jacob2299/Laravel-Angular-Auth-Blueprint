import { UserResponse } from './user.response';

export interface ResetPasswordResponse {
  success?: boolean;
  message?: string;
  token?: string;
  user?: UserResponse;
}
