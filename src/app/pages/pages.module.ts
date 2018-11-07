import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routes';

// Pages
import { DashboardComponent } from './dashboard/dashboard.component';
// ProfileComponent
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from './chart/chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Components
import { MoreLessComponent } from '../components/more-less/more-less.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';

// 3rd Libraries
import { ChartsModule } from 'ng2-charts';
import { ThemePickerComponent } from './account-settings/theme-picker/theme-picker.component';
import { UpdateInfoComponent } from './account-settings/update-info/update-info.component';
import { CommonModule } from '@angular/common';
import { UploadPictureComponent } from './account-settings/update-info/upload-picture/upload-picture.component';

// Pipes
import { PipeModule } from '../pipes/pipe.module';


@NgModule({
  declarations: [
    PagesComponent,
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
    PipeModule
  ],
  exports: [
    PipeModule
  ],

})

export class PagesModule { }
