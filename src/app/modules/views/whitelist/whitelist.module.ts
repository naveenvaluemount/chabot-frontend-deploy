import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhitelistComponent } from './whitelist.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';

const Routes: Route[] = [
  {
      path     : '',
      component: WhitelistComponent
  }
];


@NgModule({
  declarations: [
    WhitelistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class WhitelistModule { }
