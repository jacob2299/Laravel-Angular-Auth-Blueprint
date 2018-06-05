import { NgModule } from '@angular/core';
import { AuthRepository } from './auth/auth.repository';
import { NotifcationRepository } from './auth/notification.repository';

@NgModule({
  providers: [
    AuthRepository,
    NotifcationRepository
  ],
})
export class RepositoriesModule { }
