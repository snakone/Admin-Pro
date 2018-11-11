import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages.routes';

// Admin
import { AdminModule } from './admin/admin.module';

// Search
import { SearchModule } from './search/search.module';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';

// ProfileComponent
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from './chart/chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Account Settings
import { ThemePickerComponent } from './account-settings/theme-picker/theme-picker.component';
import { UpdateInfoComponent } from './account-settings/update-info/update-info.component';
import { UploadPictureComponent } from './account-settings/update-info/upload-picture/upload-picture.component';

// Components
import { MoreLessComponent } from '../components/more-less/more-less.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';

// 3rd Libraries
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    ChartComponent,
    MoreLessComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    ThemePickerComponent,
    UpdateInfoComponent,
    UploadPictureComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AdminModule,
    SearchModule
  ]
})

export class PagesModule { }
