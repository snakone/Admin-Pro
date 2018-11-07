import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/services.index';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

declare function closeSideBar();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  user: User;

  constructor(public _sidebar: SidebarService,
              public _user: UserService,
              private router: Router) { }

  ngOnInit() {
    this.user = this._user.user;
    closeSideBar();  // Close SideBar on Init to reset the State.
  }

  closeBar(element:HTMLElement){  // CLose the Hover Menu after clicking a Link
    let miniSideBar = document.body.classList.contains("mini-sidebar")
    if (window.innerWidth >= 768 && miniSideBar) this.checkElement(element);
    closeSideBar();  // Close SideBar at any Case
  }

  checkElement(element:HTMLElement){
      element.style.display = "none";  // Hide the Element Menu and open it again after 0.2 secs
        setTimeout(()=> {  // Despite this is bad, It was the only solution I got
            element.style.display = "block";
        }, 200);
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
