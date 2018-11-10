import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Doctor } from 'src/app/models/doctor.model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../upload/upload-file.service';
import Swal from 'sweetalert2'
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  doctor: Doctor;  // Doctor from Mongo, ID -> _id
  readonly API_doctor = URL_SERVICES + '/doctors';

  constructor(private http: HttpClient,
              private _user: UserService,
              private _uploadFile: UploadFileService) {}


  getDoctorList(from: number){
    return this.http.get(URL_SERVICES + '/doctors?offset=' + from);
  }

  searchDoctor(value: string){
    return this.http.get(URL_SERVICES + '/search/data/doctors/' + value)
    .pipe(map((res:any) => res.doctors));
  }

  deleteDoctor(id: string){
    return this.http.delete(URL_SERVICES + `/doctors/${id}?token=${this._user.token}`)
  }

  createDoctor(doctor: Doctor):Observable<any>{
    console.log(doctor)
    return this.http.post(URL_SERVICES + `/doctors?token=${this._user.token}`, doctor);
  }

  updateDoctor(doctor: Doctor){
    console.log("Nombre en el Servicio: " + doctor.name);

    return this.http.put(URL_SERVICES + `/doctors/${doctor._id}?token=${this._user.token}`, doctor)
     .pipe(map((data:any)=> {
         console.log("Nombre de Respuesta: " + data.doctor.name);
         return data.doctor;
     }));
  }

  changePicture(file: File, id: string){
    this._uploadFile.uploadFile(file, 'doctors', id)
     .then(() => {
       Swal('Muy bien!', 'Imagen actualizada', 'success');
     }).catch(err => {
       console.log(err)
     })
  }


}
