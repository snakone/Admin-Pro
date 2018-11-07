import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { BreadCrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipeModule } from '../pipes/pipe.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipeModule
  ],
  declarations: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    BreadCrumsComponent,
    HeaderComponent,
    SidebarComponent,
    PipeModule
  ]
})

export class SharedModule { }
