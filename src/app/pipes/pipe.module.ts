import { NgModule } from '@angular/core';
import { ImagesPipe } from './images/images.pipe';
import { DoctorNamePipe } from './doctors/doctor-name.pipe';
import { AddressPipe } from './hospitals/address.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagesPipe,
    DoctorNamePipe,
    AddressPipe
  ],
  exports: [
    ImagesPipe,
    DoctorNamePipe,
    AddressPipe
  ]
})

export class PipeModule { }
