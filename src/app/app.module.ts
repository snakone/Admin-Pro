import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

// Custom Modules
import { PagesModule } from './pages/pages.module';

import { SignInComponent } from './login/signin/signin.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    Error404Component,  // Page Not Found
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,  // Load Pages fisrt with Child Routes
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
