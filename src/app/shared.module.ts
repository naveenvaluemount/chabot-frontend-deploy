import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CrudModule } from 'app/layout/common/crud/crud.module';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StatusBadgeModule } from 'app/layout/common/status-badge/status-badge.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CrudModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FuseConfirmationModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule, 
        FuseAlertModule,
        MatProgressSpinnerModule,
        StatusBadgeModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        ImageCropperModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CrudModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        FuseConfirmationModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatMenuModule,
        MatDividerModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule, 
        FuseAlertModule,
        MatProgressSpinnerModule,
        StatusBadgeModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        ImageCropperModule
    ]
})
export class SharedModule {
}
