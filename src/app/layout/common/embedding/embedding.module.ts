import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbeddingComponent } from './embedding.component';



@NgModule({
  declarations: [
    EmbeddingComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    EmbeddingComponent
  ]
})
export class EmbeddingModule { }
