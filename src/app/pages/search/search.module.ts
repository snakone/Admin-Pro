import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';

import { SearchUsersComponent } from './search-users/search-users.component';
import { SearchHospitalsComponent } from './search-hospitals/search-hospitals.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { SearchComponent } from './search.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    SearchComponent,
    SearchUsersComponent,
    SearchHospitalsComponent,
    SearchDoctorsComponent
  ]
})

export class SearchModule { }
