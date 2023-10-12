import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Route, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatIconModule } from '@angular/material/icon';
import { AuthLayoutModule } from 'app/layout/common/auth-layout/auth-layout.module';
export const Routes: Route[] = [
  {
      path     : '',
      component: ForgotPasswordComponent
  }
];
@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FuseAlertModule,
    AuthLayoutModule,
    RouterModule.forChild(Routes),
    CommonModule
  ]
})
export class ForgotPasswordModule { }
