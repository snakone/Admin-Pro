import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from 'src/app/services/services.index';

declare function closeSideBar();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})

export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService,
              private _user: UserService) { }

  ngOnInit() {
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

  logOut():void{
    this._user.userLogOut();
  }

}
