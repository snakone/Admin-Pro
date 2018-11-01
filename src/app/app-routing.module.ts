import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignInComponent } from './login/signin/signin.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafics1Component } from './pages/grafics1/grafics1.component';
import { Error404Component } from './error404/error404.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [
   {
     path: '',
     component: PagesComponent,
     children: [
       { path: 'dashboard', component: DashboardComponent },
       { path: 'progress', component: ProgressComponent },
       { path: 'graficas1', component: Grafics1Component },
     ]
   },

   { path: 'login', component: SignInComponent },
   { path: 'register', component: RegisterComponent },
   { path: '**', component: Error404Component },
   // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
