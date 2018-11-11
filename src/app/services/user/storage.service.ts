import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private router:Router) { }

  save(id: string, token: string, user: User, menu: any):void {
    console.log("Nombre guardar localStorage: " + user.name);
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  remove(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/signin']);
  }
}
