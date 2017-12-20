
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared';

import { RouterModule } from '@angular/router';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { LoginService } from './login/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutService } from './layout/layout.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthGuard, LoginService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
