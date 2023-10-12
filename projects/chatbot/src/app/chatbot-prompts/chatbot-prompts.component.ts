import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-prompts',
  templateUrl: './chatbot-prompts.component.html',
})
export class ChatbotPromptsComponent {
  @Input("data") data:any;
  @Output() onSelect = new EventEmitter;
  select(item:any){
    this.onSelect.emit(item)
  }

}
