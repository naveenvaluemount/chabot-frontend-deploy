import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './image-cropper.component'
import { Route, RouterModule } from '@angular/router';
// const Routes: Route[] = [
//   {
//       path     : '',
//       component: ImageCropperComponent,
//   }
// ];
@NgModule({
  declarations: [
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ImageCropperModule,
    // RouterModule.forChild(Routes)
  ],
  exports: [
    ImageCropperComponent
  ]
})
export class ImagecropperModule { }
