import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  user: User;

  constructor(public _user: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this._user.user;
  }

  logOut():void {
    if (this._user.userLogOut()){
      Swal('Acabas de salir!', 'Esperamos verte pronto!', 'info')
       .then(() => {
         this.router.navigate(['/signin']);
       });
    }
  }

}
