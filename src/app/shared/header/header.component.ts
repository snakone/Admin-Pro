import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  constructor(private _user: UserService) { }

  ngOnInit() {
  }

  logOut():void{
    this._user.userLogOut();
  }

}
