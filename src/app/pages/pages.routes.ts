import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from './chart/chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './admin/users/users.component';
import { HospitalsComponent } from './admin/hospitals/hospitals.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';

const PagesRoutes: Routes = [
      // Send Data to Router so We know anytime where are We.
      { path: 'dashboard', component: DashboardComponent,
        data: { page: "Dashboard", content:"Principal"}
      },
      { path: 'profile', component: ProfileComponent,
        data: { page: "Perfil", content:"Cuenta"}
      },
      { path: 'progress', component: ProgressComponent,
        data: { page: "Progreso", content:"Página"}
      },
      { path: 'charts', component: ChartComponent,
        data: { page: "Gráficas", content:"Página"}
      },
      { path: 'promises', component: PromisesComponent,
        data: { page: "Promesas", content:"Página"}
      },
      { path: 'rxjs', component: RxjsComponent,
        data: { page: "Observables", content:"Página"}
      },
      { path: 'settings', component: AccountSettingsComponent,
        data: { page: "Ajustes", content:"Cuenta"}
      },
      { path: 'searching/:value', component: SearchComponent,
        data: { page: "Buscador", content:"Principal"}
      },
      // Admin Routes
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AdminGuard],
        data: { page: "Usuarios", content:"Mantenimiento"}
      },
      {
        path: 'hospitals',
        component: HospitalsComponent,
        canActivate: [AdminGuard],
        data: { page: "Hospitales", content:"Mantenimiento"}
      },
      {
        path: 'doctors',
        component: DoctorsComponent,
        canActivate: [AdminGuard],
        data: { page: "Doctores", content:"Mantenimiento"}
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],  // Child Routes
  exports: [RouterModule]
})

export class PagesRoutingModule { }
