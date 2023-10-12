import { Component, ViewChild, Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'chatbot-footer',
  templateUrl: './chatbot-footer.component.html',
})
export class ChatbotFooterComponent {
  @ViewChild("input") input;
  @Output() onKeyPress = new EventEmitter;
  message = new FormControl('');
  keypress(e: any) {
    if (e.key == 'Enter') {
      e.preventDefault();
      this.onKeyPress.emit(this.message.value);
  
    }
  }
}
