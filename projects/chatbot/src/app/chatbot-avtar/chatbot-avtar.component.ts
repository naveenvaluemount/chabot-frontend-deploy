import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-avtar',
  templateUrl: './chatbot-avtar.component.html',
})
export class ChatbotAvtarComponent {
  @Input("src") src:any;
  @Input("name") name:any;

  @HostBinding('style.background-image') get setBg(){

    if(this.src){
      return `url(${this.src})`
    }
   

    
    
  }

}
