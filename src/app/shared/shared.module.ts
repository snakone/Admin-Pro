import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
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
