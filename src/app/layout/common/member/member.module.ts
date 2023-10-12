import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { SharedModule } from 'app/shared.module';
import { DialogModule } from '../dialog/dialog.module';


@NgModule({
  declarations: [
    MemberComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule
  ],
  exports:[
    MemberComponent
  ]
})
export class MemberModule { }
