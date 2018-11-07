import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload/upload-file.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly API_USER = URL_SERVICES + '/users';

  constructor(private http: HttpClient,
              private _uploadFile: UploadFileService,
              private router: Router) {
    this.loadStoreUserData()
 }

  user: User;  // User from Mongo, ID -> _id
  token: string;
  auth2: any;

  saveUserToLocalStorage(id: string, token: string, user: User):void{
    // console.log("Nombre guardar localStorage: " + user.name);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  loadStoreUserData():void{
    if (localStorage.getItem('token')){  // If Token Exist
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = <User>{};
    }
  }

  createUser(user: User):Observable<any>{
    // console.log(user)
    return this.http.post(this.API_USER, user);
  }

  updateUser(name: string, email: string, lastName: string){
    // console.log("Nombre en el Servicio: " + name);
    let data = {
      name: name,
      email: email,
      lastName: lastName
    }

    return this.http.put(URL_SERVICES + `/users/${this.user['_id']}?token=${this.token}`, data)
     .pipe(map((data:any)=> {
         let updatedUser: User = data.user;
         // console.log("Nombre de Respuesta: " + updatedUser.name);
         this.saveUserToLocalStorage(updatedUser['_id'], this.token, updatedUser);
         return updatedUser;
     }));

  }

  signInUser(userSignIn: User, remember: boolean):Observable<any>{
    return this.http.post(URL_SERVICES + '/login', userSignIn)
    .pipe(map((res:any) => {   // NORMAL SIGN UP
        this.saveUserToLocalStorage(res.id,res.token,res.user);
        remember ? localStorage.setItem('email', res.user.email) :
        localStorage.removeItem('email');
        return res;  // Return The User Who Signed In
    }));
  }

  googleSignIn(token){  // GOOGLE SIGN UP
    return this.http.post(URL_SERVICES + '/login/google', {token})
     .pipe(map((res:any) => {
       this.saveUserToLocalStorage(res.id,res.token,res.user);
       return true;   // Return Sign In OK
     }));
  }

  areYouOnline():boolean{
    return this.token.length > 5 ? true : false;
  }

  userLogOut():boolean {
    if (!this.areYouOnline()) return false;
    if (this.auth2 != undefined) this.auth2.disconnect();
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
    return true;
  }

  changePicture(file: File, id: string){
    this._uploadFile.uploadFile(file, 'users', id)
     .then((res:any) => {
       this.user.image = res.updatedUser.image;
       Swal('Muy bien!', 'Imagen actualizada', 'success');
       this.saveUserToLocalStorage(id, this.token, this.user);
console.log(this.user)
     }).catch(err => {
       console.log(err)
     })
  }
}
