import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';


const Routes: Route[] = [
  {
      path     : '',
      component: UsersComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class UsersModule { }
