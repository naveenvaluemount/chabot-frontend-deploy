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
  receiver_id: any;

  constructor(private api: ChatbotService, private cd: ChangeDetectorRef, private ele:ElementRef, private socket: Socket) {
    this.chatHistory = this.api.chatHistory;
  }
  ngAfterViewInit(): void {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      this.socket.emit('newUser', sessionId);
    }

    this.receiver_id = this.secret.split('-')?.[0];

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
      // this.socket.emit('existChat', {sender_id: sessionId, receiver_id: '653b41b065e9597b46d94304'});
      this.socket.emit('existChat', {sender_id: sessionId, receiver_id: this.receiver_id});
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
  retrive(client: any, question: any) {
    setTimeout(() => {
      this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
    }, 100);
    this.api.retrive({ client: client, question: question }).subscribe((response: any) => {
      if (response.statusCode == 200) {
        if (response.response.statusCode == 200) {
          this.spinner = false;
          let category = response.response.response;
          if (response.response.type == 'category') {
            this.chatHistory.push({ responseType: 'answer', type: 'category', data: category });
          }
          if (response.response.type == 'faq') {
            this.chatHistory.push({ responseType: 'answer', type: 'faq', data: category });
          }
          if (response.response.type == 'prompt') {
            this.chatHistory.push({ responseType: 'answer', type: 'prompt', data: category });
          }
          this.api.chatHistory = this.chatHistory;
        }
      }
    })
  }
  initial(client: any, id: any) {
    setTimeout(() => {
      this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
    }, 100);
    this.api.initial({ client: client, content: id }).subscribe((response: any) => {
      if (response.statusCode == 200) {
        if (response.statusCode == 200) {
          let category = response.response;
          this.spinner = false;
          if (response.response.type == 'category') {
            this.chatHistory.push({ responseType: 'answer', type: 'category', data: category });
          }
          if (response.response.type == 'faq') {
            this.chatHistory.push({ responseType: 'answer', type: 'faq', data: category[0].answer });
          }
          if (response.response.type == 'prompt') {
            this.chatHistory.push({ responseType: 'answer', type: 'prompt', data: category });
          }
          this.api.chatHistory = this.chatHistory;
        }
      }
    });
  }
  onCategorySelect(item: any) {
    this.spinner = true;
    this.initial(this.organization?.id, item.categoryId);
    this.chatHistory.push({ responseType: 'question', type: 'message', data: item?.categoryName });
    this.api.chatHistory = this.chatHistory;
  }
  onPromptSelect(item: any) {
    this.spinner = true;
    this.retrive(this.organization?.id, item.displayText);
    this.chatHistory.push({ responseType: 'question', type: 'message', data: item?.displayText });
    this.api.chatHistory = this.chatHistory;
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
     sendObj.receiver_id = this.receiver_id,
     sendObj.content = content
    this.api.sendMessage(sendObj).subscribe((response: any) => {
      if (response.statusCode == 200) {
        this.socket.emit('existChat', {sender_id: sessionId, receiver_id: this.receiver_id});
        this.socket.emit('newChat', response.response);
      }
    });
  }

  getMessages(id: any) {
    setTimeout(() => {
      this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
     }, 100);
    let sessionId = localStorage.getItem("sessionId");
    this.socket.emit('existChat', {sender_id: sessionId, receiver_id: this.receiver_id});
     this.socket.on('loadChats', (data)=>{
      console.log("loadChats",data);
    })
  }

  // =====================================================

  public chatData: any =
    [
      {
        title: 'Hi',
        visited: true,
        responseTitles: ['This is chatbot', 'Choose one of my service'],
        children: [
          {
            title: 'Fruit',
            visited: false,
            responseTitles: ['Fruits are good for health', 'Choose a fruit'],
            children: [
              { title: 'Apple', visited: false },
              { title: 'Banana', visited: false },
              { title: 'Fruit loops', visited: false },
            ]
          },
          {
            title: 'Vegetables',
            visited: false,
            children: [
              {
                title: 'Green',
                visited: false,
                children: [
                  { title: 'Broccoli', visited: false },
                  { title: 'Brussel sprouts', visited: false },
                ]
              }, {
                title: 'Orange',
                visited: false,
                children: [
                  { title: 'Pumpkins', visited: false },
                  { title: 'Carrots', visited: false },
                ]
              },
            ]
          },
        ]
      }
    ];

    public newMessage:any;

    send(){
      this.newMessage = {
        title: 'How do you do?',
        direction: 'left'
      },
      this.newMessage = {
        title: 'Good',
        direction: 'right'
      }
    }

}
