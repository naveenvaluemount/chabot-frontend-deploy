import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';
import { SvgModule } from 'app/layout/common/svg/svg.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatPaginatorModule } from '@angular/material/paginator';

const Routes: Route[] = [
  {
      path     : '',
      component: ThemesComponent
  }
];

@NgModule({
  declarations: [
    ThemesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SvgModule,
    FuseCardModule,
    MatPaginatorModule,
    RouterModule.forChild(Routes)
  ]
})
export class ThemesModule { }
