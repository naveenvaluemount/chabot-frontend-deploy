import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent {

  public node:any = {
    name: 'root',
    children: [
      { name: 'a', children: [] },
      {
        name: 'b',
        children: [
          { name: 'b-1', children: [] },
          {
            name: 'b-2',
            children: [
              { name: 'b-2-1', children: [] },
              { name: 'b-2-2', children: [] },
              { name: 'b-2-3', children: [] },
            ],
          },
        ],
      },
      {
        name: 'c',
        children: [
          { name: 'c-1', children: [] },
          { name: 'c-2', children: [] },
        ],
      },
    ],
  };

  


}
