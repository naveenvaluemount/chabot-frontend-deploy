import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-row',
  templateUrl: './chatbot-row.component.html',
})
export class ChatbotRowComponent {
  @Input("type") type:any;
  @HostBinding("class")  get classes(){
    return this.type == 'question' ? 'question' : 'answer'
  }

}
