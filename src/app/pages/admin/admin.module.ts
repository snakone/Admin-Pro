import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule
  ],
  declarations: [
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
  ],
  exports: [
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    FormsModule,
    PipesModule
  ]
})

export class AdminModule { }
