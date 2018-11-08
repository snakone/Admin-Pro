import { Component, OnInit } from '@angular/core';

declare function init_plugins();  // Init JQuery Plugins

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styles: []
})

export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  // When coming Straight, Init JQuery Plugins -> SideBar
     init_plugins();
  }

}
