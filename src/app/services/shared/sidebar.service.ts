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
        { title: "Progress", URL: '/progress' },
        { title: "Charts", URL: '/charts' },
        { title: "Promises", URL: '/promises'},
        { title: "Rxjs", URL: '/rxjs'}
      ]
    },
    {
      title: "Administrar",
      icon: "mdi mdi-folder-lock-open",
      subMenu: [
        { title: "Usuarios", URL: '/users' },
        { title: "Hospitales", URL: '/hospitals' },
        { title: "Doctores", URL: '/doctors'}
      ]
    }
  ];

  constructor() { }
}
