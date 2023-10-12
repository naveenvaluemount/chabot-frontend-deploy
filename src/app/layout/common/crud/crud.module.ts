import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent,AutoFocusDirective } from './crud.component';

import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogModule } from '../dialog/dialog.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrudComponent,
    AutoFocusDirective
  ],
  imports: [
    CommonModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    FuseDrawerModule,
    MatPaginatorModule,
    BreadcrumbModule,
    MatProgressSpinnerModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CrudComponent,

  ]
})
export class CrudModule { }
