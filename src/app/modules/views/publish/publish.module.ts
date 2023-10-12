import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish.component';
import { SharedModule } from 'app/shared.module';
import { DialogModule } from 'app/layout/common/dialog/dialog.module';



@NgModule({
  declarations: [
    PublishComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule
  ]
})
export class PublishModule { }
