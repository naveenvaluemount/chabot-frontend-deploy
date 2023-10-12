import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { NoAuthGuard } from 'app/core/no-auth.guard';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LayoutComponent,
        // canMatch: [NoAuthGuard],
        data: {
          layout: 'empty'
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'sign-in'
          }, {
            path: 'sign-in',
            loadChildren: () => import('app/modules/user/sign-in/sign-in.module').then(m => m.SignInModule)
          }, {
            path: 'forgot-password',
            loadChildren: () => import('app/modules/user/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
          }, {
            path: 'reset-password/:token',
            loadChildren: () => import('app/modules/user/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
          }
        ]
      }

    ])
  ]
})
export class UserModule { }
