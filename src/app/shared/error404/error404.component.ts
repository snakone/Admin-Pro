import { Component, OnInit } from '@angular/core';

declare function init_plugins();  // Init JQuery Plugins

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})

export class Error404Component implements OnInit {

  year: number;

  constructor() { }

  ngOnInit() {
  // When coming Straight, Init JQuery Plugins -> SideBar
     init_plugins();
     this.year = new Date().getFullYear();
  }

}
