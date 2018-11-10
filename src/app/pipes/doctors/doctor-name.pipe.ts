import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorName'
})

export class DoctorNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value = "Dr. " + value;
  }

}
