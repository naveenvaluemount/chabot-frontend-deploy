import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'chatbot-loader',
  templateUrl: './chatbot-loader.component.html',
})
export class ChatBotLoaderComponent implements OnChanges {

  public loading:boolean = false;

  @Input("chatData") chatData=[
    {
      title:'Hi',
      direction: 'left'
    },
    {
      title:'Hello',
      direction: 'right'
    },
    {
      title:'H R U?',
      direction: 'left'
    },
    {
      title:'Doing great!!!',
      direction: 'right'
    },
  ];

  @Input("newMessage") newMessage;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("zzzzzzzzzzzzzz");
    this.loading = true;
    
    setTimeout(function(this){
      this.chatData.push(this.newMessage);
      this.loading = false;
      console.log("chatData", this.chatData);
    },3000)

  }

}
