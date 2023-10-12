import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-list',
  templateUrl: './chatbot-list.component.html',
})
export class ChatbotListComponent {
  @Input("data") data:any;
  @Output() onSelect = new EventEmitter;
  select(item:any){
    this.onSelect.emit(item)
  }

}
