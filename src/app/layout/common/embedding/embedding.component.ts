import { Component, isDevMode, Renderer2 } from '@angular/core';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-embedding',
  templateUrl: './embedding.component.html',
  styleUrls: ['./embedding.component.scss']
})
export class EmbeddingComponent {
  constructor(private renderer2:Renderer2){

    if (isDevMode()) {
      this.embedd('assets/chatbot.js')
    } else {
      this.embedd(environment.baseurl+'/chatbot.js')
    }
   
  }

  embedd(url:any){
    let chatbot = this.renderer2.createElement("script");
    this.renderer2.setAttribute(chatbot,"src",url);
    this.renderer2.setAttribute(chatbot,"CLIENTID","81a9ab4f$aa8f$46a5$8ce7$7e578b1dc385");
    this.renderer2.appendChild(document.body,chatbot)
  }

}

