import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})

export class AddressPipe implements PipeTransform {

  transform(value: any, _args?: any): any {
    return value = "C/ " + value;
  }

}
