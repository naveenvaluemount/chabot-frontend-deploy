import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
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
      component: SignInComponent
  }
];


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FuseAlertModule,
    AuthLayoutModule,
    RouterModule.forChild(Routes),
    CommonModule
  ]
})
export class SignInModule { }
