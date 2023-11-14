import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'app/shared.module';
import { AuthGuard } from 'app/core/auth.guard';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MemberModule } from 'app/layout/common/member/member.module';
import { CodeSnippetModule } from '../views/code-snippet/code-snippet.module';
import { PublishModule } from '../views/publish/publish.module';




@NgModule({
  declarations:[
    OrganizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MemberModule,
    CodeSnippetModule,
    PublishModule,
    FuseNavigationModule,
    RouterModule.forChild([
    {
        path: '',
        component: OrganizationComponent,
        canMatch: [AuthGuard],
        children:[
          { path: '', pathMatch: 'full', redirectTo: 'services' },
          { path: 'services', loadChildren: () => import('app/modules/views/services/services.module').then(m => m.ServicesModule), data: { breadcrumb: 'Services' } },
          { path: 'themes', loadChildren: () => import('app/modules/views/themes/themes.module').then(m => m.ThemesModule), data: { breadcrumb: 'Themes' } },
          { path: 'whitelist', loadChildren: () => import('app/modules/views/whitelist/whitelist.module').then(m => m.WhitelistModule), data: { breadcrumb: 'Whitelist' } },
          { path: 'faq', loadChildren: () => import('app/modules/views/faq/faq.module').then(m => m.FaqModule), data: { breadcrumb: 'Faq' } },
          { path: 'templates', loadChildren: ()=> import('app/modules/views/templates/templates.module'). then(m =>m.TemplatesModule), data: { breadcrumb: 'Templates'}},
          { path: 'chat-menu', loadChildren: ()=> import('app/modules/views/chat-menu/chat-menu.module'). then(m =>m.ChatMenuModule), data: { breadcrumb: 'Chat-menu'}},
        ]
      }


    ])
  ]
})
export class OrganizationModule { }
