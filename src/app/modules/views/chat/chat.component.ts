import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiService } from 'app/core/api.service';
import { ChatbotService } from '../../../../../projects/chatbot/src/app/chatbot.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  msg: any;
  chats: any = [];
  sender_id: any;
  receiver_id: any;
  user: any;
  userId: any;
  messageData: any;
  chatMessages: any = [];
  constructor(private service: ApiService, private api: ChatbotService, private socket: Socket){}

ngOnInit(): void {
  this.user = JSON.parse(localStorage.getItem('data'));
  this.userId = this.user?.orgIds[0];
  // this.sender_id = this.userId;
  this.getChatList();
}

ngAfterViewInit(): void {
      this.socket.emit('newChat', this.messageData);
      this.socket.on('loadNewChat', (data)=>{
        console.log('loadNewChat', data)
        this.chatMessages.push(data);
        this.sender_id = data.receiver_id;
        console.log(this.sender_id);
      },);
    
      // this.getChatInfo();
      this.socket.on('loadNewUser', (data: any)=>{
        this.getChatList();
      });
}

getChatList(){
  // const user = JSON.parse(localStorage.getItem('data'));
  // const userId = user?._id;
  this.service.getChatList(this.userId).subscribe((res: any)=>{
   if (res.statusCode == 200) {
      this.chats = res.chats;
      this.chats.map((data: any)=>{
        this.sender_id = data.organization
      });
   }
  });
}

onKeyPress(e: any) {
  console.log("clicked")
  if (e.key == 'Enter') {
  const user = JSON.parse(localStorage.getItem('data'));
  this.sendMessage(user?._id, this.msg);  
  }
}

sendMessage(sessionId: any, content: any) {
  this.receiver_id = localStorage.getItem("receiver_id")
  setTimeout(() => {
    // this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
   }, 100);
   let sendObj = Object.assign({});
   sendObj.sender_id = this.sender_id,
   sendObj.receiver_id = this.receiver_id,
   sendObj.content = content
  this.api.sendMessage(sendObj).subscribe((response: any) => {
    if (response.statusCode == 200) {
      this.msg = '';
      this.messageData = response.response;
      this.socket.emit('newChat', this.messageData);
      // this.socket.on('loadNewChat', (data)=>{
      //   console.log(data);
        
      // }, );
  this.socket.emit('existChat', {sender_id: this.sender_id, receiver_id: this.receiver_id});

    }
  });
}

getChatInfo(data: any){
  console.log(this.sender_id)
  this.receiver_id = data._id;
  localStorage.setItem('receiver_id', this.receiver_id);
  this.socket.emit('existChat', {sender_id: this.sender_id, receiver_id: this.receiver_id});
  this.socket.on('loadChats', (data)=>{
    this.chatMessages = data.chats;
    console.log("msgs", this.chatMessages)
  })
}


}
