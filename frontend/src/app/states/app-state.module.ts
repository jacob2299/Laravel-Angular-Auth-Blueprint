import { ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './auth/auth.reducer';
import { NotificationReducer } from './notification/notification.reducer';

export const AppStateModule: ModuleWithProviders = StoreModule.forRoot({
  auth: AuthReducer,
  notification: NotificationReducer,
});
