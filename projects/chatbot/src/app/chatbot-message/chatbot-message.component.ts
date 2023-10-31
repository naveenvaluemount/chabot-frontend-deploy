import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'chatbot-message',
  templateUrl: './chatbot-message.component.html',
})
export class ChatBotMessageComponent implements OnInit {
  @Input("content") content;
  sender_id: any;
  ngOnInit(): void {
    this.sender_id = localStorage.getItem('sessionId');
  }

}
