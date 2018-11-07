import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Pipe({
  name: 'image'
})

export class ImagesPipe implements PipeTransform {

  transform(image: string, collection: string = 'users'): any {
    let URL = URL_SERVICES + '/images';
    if (image == undefined) return URL + '/random/default-picture';  // Intentional
    if (image.includes('https')) return image;  // Https = Google Picture

    switch(collection){

      case 'users':
            URL += '/users/' + image;
      break;

      case 'hospitals':
            URL += '/hospitals/' + image;
      break;

      case 'doctors':
            URL += '/doctors/' + image;
      break;

      default:
            console.log('Tipo de imagen no existe');
            URL += '/random/default-picture';
    }
    return URL;
  }

}
