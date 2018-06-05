import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppActionsModule } from './states/app-actions.module';
import { AppStateModule } from './states/app-state.module';
import { ServicesModule } from './services/services.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { GuardsModule } from './guards/guards.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppActionsModule,
    AppStateModule,
    HttpClientModule,
    ServicesModule,
    RepositoriesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GuardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
