import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'app/shared.module';
import { Route, RouterModule } from '@angular/router';

const Routes: Route[] = [
  {
    path:'',
    component: ChatComponent
  }
]

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(Routes)
  ]
})
export class ChatModule { }
