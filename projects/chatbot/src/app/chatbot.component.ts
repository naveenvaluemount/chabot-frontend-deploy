import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatbotBodyComponent } from './chatbot-body/chatbot-body.component';
import { ChatbotFooterComponent } from './chatbot-footer/chatbot-footer.component';
import { ChatbotService } from './chatbot.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatBotComponent {
  @ViewChild(ChatbotBodyComponent) chatBody: ChatbotBodyComponent;
  @ViewChild(ChatbotFooterComponent) chatFooter: ChatbotFooterComponent;
  @Input('secret') secret: any = '652e4d2a47833867cfa37a4c-d99b9ebaea463af4ae4f47285b3acf19';
  expanded: boolean = false;
  spinner: boolean = true;
  organization: any;
  category: any = [];
  chatHistory: any = [];
  chatMessages: any = [];
  constructor(private api: ChatbotService, private cd: ChangeDetectorRef, private ele:ElementRef, private socket: Socket) {
    this.chatHistory = this.api.chatHistory;
  }
  ngAfterViewInit(): void {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      this.socket.emit('newUser', sessionId);
    }
    this.api.validator({secret: this.secret, sessionId: sessionId }).subscribe(data => {
      if (data.statusCode === 200) {
        this.organization = data.response;
        this.api.setTheme(this.ele, this.organization.theme);
        this.cd.detectChanges();
        localStorage.setItem("sessionId", data.response?.sessionId);
      }
    });
    let user = {
      _id: sessionId
    }
    this.socket.emit("setup", user);
      // this.socket.emit('newChat', this.messageData);
      this.socket.on('loadNewChat', (data)=>{
        this.chatMessages.push(data);
      }, );
  }
  messageSentToUi(isOwnMessage, data){
    console.log(isOwnMessage, data)
  }
  onToggle(value: any) {
    this.expanded = value;
    const sessionId = localStorage.getItem('sessionId')
    setTimeout(() => {
      this.chatFooter?.input?.nativeElement?.focus()
    }, 100);
    if (this.expanded) {
      this.getMessages(sessionId);
      this.socket.emit('existChat', {sender_id: sessionId, receiver_id: '653b41b065e9597b46d94304'});
      this.socket.on('loadChats', (data)=>{
        console.log(data);
        this.spinner = false;
        this.chatMessages = data.chats;
        console.log("msgs", this.chatMessages)
      })
    }
    if (this.api.chatHistory.length == 0) {
      // this.initial(this.organization?.id, '');
    } else {
      this.spinner = false;
    }
  }

  onKeyPress(question: any) {
    this.spinner = true;
    const sessionId = localStorage.getItem('sessionId');
    // this.retrive(this.organization?.id, question);
    this.sendMessage(sessionId, question);
  }
  socketSendMessage(message: string) {
    // Emit the message to the server
    this.socket.emit('newChat', { content: message, sender: 'Chatbot' });
  }
  sendMessage(sessionId: any, content: any) {
    setTimeout(() => {
      this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
     }, 100);
     let sendObj = Object.assign({});
     sendObj.sender_id = sessionId,
     sendObj.receiver_id = "653b41b065e9597b46d94304",
     sendObj.content = content
    this.api.sendMessage(sendObj).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.socket.emit('existChat', {sender_id: sessionId, receiver_id: '653b41b065e9597b46d94304'});
        this.socket.emit('newChat', response.response);
      }
    });
  }

  getMessages(id: any){
    setTimeout(() => {
      this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
     }, 100);
    let sessionId = localStorage.getItem("sessionId");
    this.socket.emit('existChat', {sender_id: sessionId, receiver_id: "653b41b065e9597b46d94304"});
     this.socket.on('loadChats', (data)=>{
      console.log("loadChats",data);
    })
  }
}
