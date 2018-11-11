import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  user: User;
  value: string;
  searchForm: NgForm;

  constructor(public _user: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this._user.user;
    const input = document.getElementById('search');
    this.listenInputChanges(input);
  }

  logOut():void {
    if (this._user.userLogOut()){
      Swal('Acabas de salir!', 'Esperamos verte pronto!', 'info')
       .then(() => {
         setTimeout(()=> {
           this.router.navigate(['/signin']);
          }, 1000)
       });
    }
  }

  listenInputChanges(input: HTMLElement){
    fromEvent(input, 'input', {passive: true})
      .pipe(map((k: KeyboardEvent) => {
            return k.target['value'];
        }),debounceTime(1500))
         .subscribe(res => {
        if (res != '') {
            this.router.navigate(['/searching', res])
        } else {
          console.log("Dejo de escribir")
        }
      });
   }

}
