import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent {
  @Input() showCropper: boolean;
  @Input() imageChangedEvent: any;
  @Input() base64String: string;
  @Output() imageCropped = new EventEmitter<ImageCroppedEvent>();

  constructor(){}

  cropImage(event: ImageCroppedEvent) {
    this.imageCropped.emit(event);
  }
}
