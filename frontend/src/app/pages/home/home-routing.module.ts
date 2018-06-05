import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { Google2faQrComponent } from './google2fa-qr/google2fa-qr.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'google2fa',
    component: Google2faQrComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
