import { NgModule } from '@angular/core';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent
  ]
})

export class SharedModule { }
