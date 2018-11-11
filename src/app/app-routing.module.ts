import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './login/signin/signin.component';
import { SignUpComponent } from './login/signup/signup.component';
import { Error404Component } from './shared/error404/error404.component';
import { PagesComponent } from './pages/pages.component';
import { UserRouteGuard } from './services/guards/user-route.guard';
import { RefreshTokenGuard } from './services/guards/refresh-token.guard';

const routes: Routes = [
   { path: 'signin', component: SignInComponent },
   { path: 'signup', component: SignUpComponent },
   {
     path: '',
     component: PagesComponent,
     canActivate: [UserRouteGuard],
     canActivateChild: [RefreshTokenGuard],
     loadChildren: './pages/pages.module#PagesModule'},
   { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
