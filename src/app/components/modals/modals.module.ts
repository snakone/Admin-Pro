import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditHospitalComponent } from './edit-hospital/edit-hospital.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { EditPictureComponent } from './edit-picture/edit-picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Pipes
import { PipeModule } from '../../pipes/pipe.module';

// Material
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    PipeModule,
  ],
  declarations: [
    EditUserComponent,
    EditHospitalComponent,
    EditDoctorComponent,
    CreateHospitalComponent,
    CreateDoctorComponent,
    EditPictureComponent
  ],
  exports: [
    EditUserComponent,
    EditHospitalComponent,
    EditDoctorComponent,
    CreateHospitalComponent,
    CreateDoctorComponent,
    EditPictureComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    EditUserComponent,
    EditHospitalComponent,
    EditDoctorComponent,
    CreateHospitalComponent,
    CreateDoctorComponent,
    EditPictureComponent
  ]
})
export class ModalsModule { }
