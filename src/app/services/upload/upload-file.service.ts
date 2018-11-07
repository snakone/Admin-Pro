import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, collection: string, id: string){

    return new Promise((res,req)=> {
      let formData = new FormData();
      let ajax = new XMLHttpRequest();
      formData.append('image', file, file.name);
      ajax.onreadystatechange = ()=>{
        if (ajax.readyState === 4){
          if (ajax.status === 200) {
            console.log("Imagen Subida");
            res(JSON.parse(ajax.response));
          } else req(ajax.response);
        }
      }
      let URL = URL_SERVICES + `/upload/${collection}/${id}`;
      ajax.open('PUT', URL, true);
      ajax.send(formData);
    });

  }
}
