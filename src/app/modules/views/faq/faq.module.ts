import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';

const Routes: Route[] = [
  {
      path     : '',
      component: FaqComponent
  }
];

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class FaqModule { }
