import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let sideBar = document.body.classList;
    if (sideBar.contains("show-sidebar")) {
      sideBar.remove("show-sidebar");
      return false;
    }
  }

}
