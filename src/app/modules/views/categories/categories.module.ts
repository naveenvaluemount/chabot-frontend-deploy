import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';
const Routes: Route[] = [
  {
      path     : '',
      component: CategoriesComponent
  }
];

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class CategoriesModule { }
