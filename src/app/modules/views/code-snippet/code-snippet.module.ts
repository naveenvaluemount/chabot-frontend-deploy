import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from './code-snippet.component';
import { SharedModule } from 'app/shared.module'; 
import { FuseHighlightModule } from '@fuse/components/highlight';
import { DialogModule } from 'app/layout/common/dialog/dialog.module';



@NgModule({
  declarations: [
    CodeSnippetComponent
  ],
  imports: [
    CommonModule,
    FuseHighlightModule,
    DialogModule,
    SharedModule
  ]
})
export class CodeSnippetModule { }
