import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SidebarService {

  menu:any = [
    {
      title: "Principal",
      icon: "mdi mdi-gauge",
      subMenu: [
        { title: "Dashboard", URL: '/dashboard' },
        { title: "Progress", URL: '/progress' },
        { title: "Charts", URL: '/charts' },
        { title: "Promises", URL: '/promises'},
        { title: "Rxjs", URL: '/rxjs'}
      ]
    }
  ];

  constructor() { }
}
