import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsComponent } from './organizations.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagecropperModule } from 'app/layout/common/imageCropper/image-cropper/image-cropper.module';
const Routes: Route[] = [
  {
      path     : '',
      component: OrganizationsComponent,
  }
];


@NgModule({
  declarations: [
    OrganizationsComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    SharedModule,
    ImagecropperModule,
    RouterModule.forChild(Routes),
  ]
})
export class OrganizationsModule { }
