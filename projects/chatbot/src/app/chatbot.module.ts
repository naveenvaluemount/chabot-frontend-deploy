import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { ChatBotComponent } from './chatbot.component';
import { ChatBotMessageComponent } from './chatbot-message/chatbot-message.component';
import { ChatbotHeaderComponent } from './chatbot-header/chatbot-header.component';
import { ChatbotBodyComponent } from './chatbot-body/chatbot-body.component';
import { ChatbotFooterComponent } from './chatbot-footer/chatbot-footer.component';
import { ChatbotPopupComponent } from './chatbot-popup/chatbot-popup.component';
import { ChatbotAvtarComponent } from './chatbot-avtar/chatbot-avtar.component';
import { ChatbotRowComponent } from './chatbot-row/chatbot-row.component';
import { ChatbotSpinnerComponent } from './chatbot-spinner/chatbot-spinner.component';
import { ChatbotHolderComponent } from './chatbot-holder/chatbot-holder.component';
import { ChatbotListComponent } from './chatbot-list/chatbot-list.component';
import { ChatbotToggleComponent } from './chatbot-toggle/chatbot-toggle.component';
import { ChatbotService } from './chatbot.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatbotPromptsComponent } from './chatbot-prompts/chatbot-prompts.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://192.168.0.108:8000', options: {} };
// const config: SocketIoConfig = { url: 'http://192.168.1.5:8000', options: {} };

@NgModule({
  declarations: [
    ChatBotComponent,
    ChatBotMessageComponent,
    ChatbotHeaderComponent,
    ChatbotBodyComponent,
    ChatbotFooterComponent,
    ChatbotPopupComponent,
    ChatbotAvtarComponent,
    ChatbotRowComponent,
    ChatbotSpinnerComponent,
    ChatbotHolderComponent,
    ChatbotListComponent,
    ChatbotPromptsComponent,
    ChatbotToggleComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [ChatbotService],
  entryComponents: [ChatBotComponent]
})
export class ChatBotModule { 
  constructor(private injector: Injector) {}
  ngDoBootstrap(){
    const chatbotEle = createCustomElement(ChatBotComponent,{injector:this.injector});
    customElements.define('app-chatbot', chatbotEle);
  }
}
