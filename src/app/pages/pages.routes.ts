import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from './chart/chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UserRouteGuard } from '../services/services.index';

const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [UserRouteGuard],
    children: [

      { path: 'dashboard', component: DashboardComponent,
        data: { page: "Dashboard", content:"Principal"}  // Send Data to Router so We know anytime where are We.
      },
      { path: 'progress', component: ProgressComponent,
        data: { page: "Progreso", content:"Principal"}
      },
      { path: 'charts', component: ChartComponent,
        data: { page: "Gráficas", content:"Principal"}
      },
      { path: 'promises', component: PromisesComponent,
        data: { page: "Promesas", content:"Principal"}
      },
      { path: 'rxjs', component: RxjsComponent,
        data: { page: "Observables", content:"Principal"}
      },
      { path: 'account-settings', component: AccountSettingsComponent,
        data: { page: "Ajustes", content:"Cuenta"} },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],  // Child Routes
  exports: [RouterModule]
})

export class PagesRoutingModule { }
