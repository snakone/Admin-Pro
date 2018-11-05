import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './login/signin/signin.component';
import { SignUpComponent } from './login/signup/signup.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
   { path: 'signin', component: SignInComponent },
   { path: 'signup', component: SignUpComponent },
   { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
