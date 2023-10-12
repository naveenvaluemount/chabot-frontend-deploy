import { Component, HostListener, Output,EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-toggle',
  templateUrl: './chatbot-toggle.component.html',
})  
export class ChatbotToggleComponent { 
  menu:boolean = false;
  @Output() onToggle = new EventEmitter;
  @HostListener('click', ['$event.target'])
  onClick() {
    this.menu =  !this.menu ? true : false;
    this.onToggle.emit(this.menu)
  }
  

}
