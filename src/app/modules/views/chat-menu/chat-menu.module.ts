import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
const Routes: Route[] = [
  {
      path     : '',
      component: ChatMenuComponent
  }
];


@NgModule({
  declarations: [
    TreeViewComponent,
    ChatMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(Routes)
  ]
})
export class ChatMenuModule { }
