import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
         SharedService,
         SidebarService,
         UserService,
         UploadFileService,
         UserRouteGuard,
         HospitalService,
         DoctorService} from './services.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    UploadFileService,
    UserRouteGuard,
    HospitalService,
    DoctorService
  ]
})

export class ServicesModule { }
