import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})

export class UserRouteGuard implements CanActivate {

  constructor(private _user: UserService,
              private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._user.areYouOnline()){
      console.log("Paso el Guard!");
      return true;
    }
      console.log("Bloqueado por el Guard");
      this.router.navigate(['/signin']);
      return false;
  }
}
