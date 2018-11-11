import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';
import { Error404Component } from './error404/error404.component';
import { ModalsModule } from '../components/modals/modals.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule,
    ModalsModule
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
    PipesModule,
    ModalsModule
  ]
})

export class SharedModule { }
