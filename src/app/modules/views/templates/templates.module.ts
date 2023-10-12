import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component'
import { SharedModule } from 'app/shared.module';
const Routes: Route[] = [
    {
        path: '', component: TemplatesComponent
    }
]

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class TemplatesModule { }
