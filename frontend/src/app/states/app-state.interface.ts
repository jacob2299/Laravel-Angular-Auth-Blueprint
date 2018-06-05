import { AuthState } from './auth/auth.state';
import { NotificationState } from './notification/notification.state';

export interface AppState {
  auth: AuthState;
  notification: NotificationState;
}
