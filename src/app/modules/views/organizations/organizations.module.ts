import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';
const Routes: Route[] = [
  {
      path     : '',
      component: OrganizationsComponent,
  }
];


@NgModule({
  declarations: [
    OrganizationsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes),
  ]
})
export class OrganizationsModule { }
