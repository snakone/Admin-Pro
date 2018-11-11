import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2'

declare function close_preloader();   // Init JQuery Plugins

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private _user: UserService,
              private router: Router){
                close_preloader();
              }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {

    if (this._user.user.role === 'ADMIN_ROLE') return true;
    else {
      console.log("Bloqueado por el Guard");
      Swal('Error', 'No tienes permiso para acceder a esta página!', 'error')
       .then(()=> {
         this.router.navigate(['/dashboard']);
         return false;
       });
    }
  }
}
