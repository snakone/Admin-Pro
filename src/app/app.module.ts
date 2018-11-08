import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { PagesModule } from './pages/pages.module';

// Services
import { ServicesModule } from './services/services.module'

import { SignInComponent } from './login/signin/signin.component';
import { SignUpComponent } from './login/signup/signup.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,  // Load Pages first with Child Routes
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
