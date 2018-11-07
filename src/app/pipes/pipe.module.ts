import { NgModule } from '@angular/core';
import { ImagesPipe } from './images/images.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagesPipe
  ],
  exports: [
    ImagesPipe
  ]
})

export class PipeModule { }
