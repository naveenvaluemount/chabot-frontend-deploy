import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent, DialogComponent, DialogFooterComponent, DialogHeaderComponent } from './dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ],
  imports: [
    CommonModule,
  ], 
  exports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ]
})
export class DialogModule { }
