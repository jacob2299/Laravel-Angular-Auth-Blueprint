import { NgModule } from '@angular/core';
import { AuthenticatedGuard } from './authenticated.guard';

@NgModule({
  providers: [
    AuthenticatedGuard
  ],
})
export class GuardsModule { }
