import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminComponent } from './superadmin.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth.guard';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SharedModule } from 'app/shared.module';
import { MemberModule } from 'app/layout/common/member/member.module';



@NgModule({
  declarations: [
    SuperAdminComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    SharedModule,
    MemberModule,
    RouterModule.forChild([{
      path: '',
      component: SuperAdminComponent,
      // canMatch: [AuthGuard], 
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'organizations' },
        { path: 'chat', loadChildren: () => import('app/modules/views/chat/chat.module').then(m => m.ChatModule), data: { breadcrumb: 'Chat' } },
        { path: 'users', loadChildren: () => import('app/modules/views/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
        { path: 'organizations', loadChildren: () => import('app/modules/views/organizations/organizations.module').then(m => m.OrganizationsModule), data: { breadcrumb: 'Organizations' } },
        { path: 'organizations/:id', loadChildren: () => import('app/modules/organization/organization.module').then(m => m.OrganizationModule), data: { breadcrumb: 'Organizations' } },
      ]
    }


    ])
  ]
})
export class SuperAdminModule { }
