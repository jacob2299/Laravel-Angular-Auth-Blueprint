import { User } from '../user';

export interface Auth {
  apiToken: string;
  user: User;
}
