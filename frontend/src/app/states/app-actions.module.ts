import { NgModule } from '@angular/core';
import { AuthActions } from './auth/auth.actions';
import { NotificationActions } from './notification/notification.actions';

@NgModule({
  providers: [
    AuthActions,
    NotificationActions,
  ],
})
export class AppActionsModule { }
