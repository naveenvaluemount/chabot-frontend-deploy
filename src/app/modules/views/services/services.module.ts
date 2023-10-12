import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SharedModule } from 'app/shared.module';


const Routes: Route[] = [
    {
        path     : '',
        component: ServicesComponent
    }
  ];

  @NgModule({
    declarations: [
      ServicesComponent
    ],
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(Routes)
    ]
  })
export class ServicesModule { }
