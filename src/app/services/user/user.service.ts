import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  readonly API_USER = URL_SERVICES + '/users';

  constructor(private http: HttpClient,
              private router: Router) {
    this.loadStoreUserData()
 }

  user: User;
  token: string;

  saveUserToLocalStorage(id: string, token: string, user: User):void{
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
      this.user = null;
    }
  }

  createUser(user: User):Observable<any>{
    return this.http.post(this.API_USER, user);
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

  userLogOut():void{
    this.user = null;
    this.token = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
