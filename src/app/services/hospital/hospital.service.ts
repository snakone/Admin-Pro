import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../upload/upload-file.service';
import Swal from 'sweetalert2'
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  hospital: Hospital;  // Hospital from Mongo, ID -> _id
  readonly API_hospital = URL_SERVICES + '/hospitals';

  constructor(private http: HttpClient,
              private _user: UserService,
              private _uploadFile: UploadFileService) {}


  getHospitalList(from: number){
    return this.http.get(URL_SERVICES + '/hospitals?offset=' + from);
  }

  searchHospital(value: string){
    return this.http.get(URL_SERVICES + '/search/data/hospitals/' + value)
    .pipe(map((res:any) => res.hospitals));
  }

  deleteHospital(id: string){
    return this.http.delete(URL_SERVICES + `/hospitals/${id}?token=${this._user.token}`)
  }

  createHospital(hospital: Hospital):Observable<any>{
    console.log(hospital)
    return this.http.post(URL_SERVICES + `/hospitals?token=${this._user.token}`, hospital);
  }

  updateHospital(hospital: Hospital){
    console.log("Nombre en el Servicio: " + hospital.name);

    return this.http.put(URL_SERVICES + `/hospitals/${hospital._id}?token=${this._user.token}`, hospital)
     .pipe(map((data:any)=> {
         console.log("Nombre de Respuesta: " + data.hospital.name);
         return data.hospital;
     }));
  }

  changePicture(file: File, id: string){
    this._uploadFile.uploadFile(file, 'hospitals', id)
     .then(() => {
       Swal('Muy bien!', 'Imagen actualizada', 'success');
     }).catch(err => {
       console.log(err)
     })
  }
}
