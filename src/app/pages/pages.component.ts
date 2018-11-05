import { Component, OnInit } from '@angular/core';

declare function init_plugins();  // Init JQuery Plugins

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})

export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 // When coming Straight, Init JQuery Plugins -> SideBar
    init_plugins();
  }

}
