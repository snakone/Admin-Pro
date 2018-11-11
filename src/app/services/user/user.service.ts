import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UploadFileService } from '../upload/upload-file.service';
import Swal from 'sweetalert2'
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;  // User from Mongo, ID -> _id
  menu: any[] = [];
  token: string;
  auth2: any;
  readonly API_USER = URL_SERVICES + '/users';

  constructor(private http: HttpClient,
              private _storage: StorageService,
              private _uploadFile: UploadFileService,
              private router: Router) {
    this.loadStoreUserData()
 }

 // CREATE //
 createUser(user: User):Observable<any>{
   return this.http.post(this.API_USER, user)
    .pipe(catchError(err => {
          Swal('Error', err.error.message, 'error');
          return throwError(err);
        }));
 }

 // READ //
  getUserList(from: number){
    return this.http.get(URL_SERVICES + '/users?offset=' + from);
  }

  searchUser(value: string){
    return this.http.get(URL_SERVICES + '/search/data/users/' + value)
    .pipe(map((res:any) => res.users));
  }

  // UPDATE //
  updateUser(user: User){
    console.log("Nombre en el Servicio: " + user.name);

    return this.http.put(URL_SERVICES + `/users/${user._id}?token=${this.token}`, user)
     .pipe(map((data:any)=> {
         if (user._id === this.user._id) {
           let updatedUser: User = data.user;
           this.saveUserToLocalStorage(updatedUser._id, this.token, updatedUser, this.menu);
         }
         console.log("Nombre de Respuesta: " + data.user.name);
         return data.user;
     }));
  }

  // DELETE //
  deleteUser(id: string){
    return this.http.delete(URL_SERVICES + `/users/${id}?token=${this.token}`)
  }

  // SIGN IN //
  // USERNAME & PASSWORD //
  signInUser(userSignIn: User, remember: boolean):Observable<any>{
    return this.http.post(URL_SERVICES + '/login', userSignIn)
    .pipe(map((res:any) => {   // NORMAL SIGN UP
        this.saveUserToLocalStorage(res._id, res.token, res.user, res.menu);
        remember ? localStorage.setItem('email', res.user.email) :
        localStorage.removeItem('email');
        return res;  // Return The User Who Signed In
    }), catchError(err => {
          Swal('Error', err.error.message, 'error');
          return throwError(err);
        })
      ); // End of Map + Pipe
  }

  // GOOGLE SIGN IN //
  googleSignIn(token){
    return this.http.post(URL_SERVICES + '/login/google', {token})
     .pipe(map((res:any) => {
       console.log(res)
       this.saveUserToLocalStorage(res._id, res.token ,res.user , res.menu);
       return true;   // Return Sign In OK
     }));
  }

  areYouOnline():boolean{
    return this.token.length > 5 ? true : false;
  }

  // LOG OUT //
  userLogOut():boolean {
    if (!this.areYouOnline()) return false;
    if (this.auth2 != undefined) this.auth2.disconnect();
    this.user = null;
    this.token = '';
    this.menu = [];
    this._storage.remove();
    return true;
  }

  // REFRESH TOKEN //
  refreshToken(){
    return this.http.get(URL_SERVICES + `/refresh-token?token=${this.token}`)
     .pipe(map((res:any) => {
         this.token = res.token;
         localStorage.setItem('token', this.token);
         console.log("Token Actualizado!")
         return true;
       }), catchError(err => {
             Swal('Error', 'No se pudo renovar tu Token!', 'error');
             this.router.navigate(['/dashboard']);
             return throwError(err);
           })
      );
  }

  // LOCAL STORAGE //
  saveUserToLocalStorage(id: string, token: string, user: User, menu: any):void{
    this._storage.save(id,token,user,menu);
    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadStoreUserData():void{
    if (localStorage.getItem('token')){  // If Token Exist
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = <User>{};
      this.menu = [];
    }
  }

  // CHANGE PICTURE //
  changePicture(file: File, id: string){
    this._uploadFile.uploadFile(file, 'users', id)
     .then((res:any) => {
       Swal('Muy bien!', 'Imagen actualizada', 'success');
        if (res.updatedUser._id === this.user._id) {
            this.user.image = res.updatedUser.image;
            this.saveUserToLocalStorage(this.user._id, this.token, this.user, this.menu);
          }
     }).catch(err => {
       console.log(err)
     });
  }

}
