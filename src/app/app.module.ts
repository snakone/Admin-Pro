import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './login/signin/signin.component';
import { Error404Component } from './error404/error404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafics1Component } from './pages/grafics1/grafics1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadCrumsComponent } from './shared/breadcrums/breadcrums.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    Error404Component,
    DashboardComponent,
    ProgressComponent,
    Grafics1Component,
    HeaderComponent,
    SidebarComponent,
    BreadCrumsComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
