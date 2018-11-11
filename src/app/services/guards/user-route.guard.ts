import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class UserRouteGuard implements CanActivate {

  constructor(private _user: UserService,
              private router: Router) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if (this._user.areYouOnline()){
      return true;
    }
      console.log("Bloqueado por el Guard");
      this.router.navigate(['/signin']);
      return false;
  }
}
