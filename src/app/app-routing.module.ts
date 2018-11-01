import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './login/signin/signin.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
   { path: 'login', component: SignInComponent },
   { path: 'register', component: RegisterComponent },
   { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
