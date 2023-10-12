import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-message',
  templateUrl: './chatbot-message.component.html',
})
export class ChatBotMessageComponent {
  @Input("content") content;


}
