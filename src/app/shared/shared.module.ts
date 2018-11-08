import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipeModule } from '../pipes/pipe.module';
import { Error404Component } from './error404/error404.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipeModule
  ],
  declarations: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component  // Page Not Found
  ],
  exports: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent,
    Error404Component,
    PipeModule
  ]
})

export class SharedModule { }
