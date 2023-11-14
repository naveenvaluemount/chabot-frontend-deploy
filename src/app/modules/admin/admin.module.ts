import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core/auth.guard';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { SharedModule } from 'app/shared.module';
import { MemberModule } from 'app/layout/common/member/member.module';
import { OrgGuard } from 'app/core/org.guard';
import { OrgResolver } from 'app/core/org.resolver';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    SharedModule,
    MemberModule,
    RouterModule.forChild([{
      path: '',
      component: AdminComponent,
      canMatch: [AuthGuard], 
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'organizations' },
        
        // { path: 'organizations',  loadChildren: () => import('app/modules/views/dashboard/dashboard.module').then(m => m.DashboardModule), resolve:{organizations:OrgGuard}, data: { breadcrumb: 'Dashboard' },canActivate:[OrgGuard]},
        { path: 'organizations',  loadChildren: () => import('app/modules/views/dashboard/dashboard.module').then(m => m.DashboardModule), resolve:{organizations:OrgGuard}, data: { breadcrumb: 'Dashboard' }},
        { path: 'organizations/:id', loadChildren: () => import('app/modules/organization/organization.module').then(m => m.OrganizationModule), data: { breadcrumb: 'Organizations' } },
      ]
    }


    ])
  ]
})
export class AdminModule { }
