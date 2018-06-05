import { User as IUser } from './user.interface';

export interface ResetPassword {
  success: boolean;
  message: string;
  apiToken: string;
  user: IUser;
}
