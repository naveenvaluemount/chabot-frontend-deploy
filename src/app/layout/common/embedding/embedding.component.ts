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
      this.embedd('assets/chatbot.js');
    } else {
      this.embedd(environment.baseurl+'/chatbot.js');
    }
   
  }

  embedd(url:any){
    let chatbot = this.renderer2.createElement("script");
    this.renderer2.setAttribute(chatbot,"src",url);
    this.renderer2.setAttribute(chatbot,"CLIENTID","652e4d2a47833867cfa37a4c-d99b9ebaea463af4ae4f47285b3acf19");
    this.renderer2.appendChild(document.body,chatbot);
  }

}

