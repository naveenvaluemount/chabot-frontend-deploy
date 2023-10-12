import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatbotBodyComponent } from './chatbot-body/chatbot-body.component';
import { ChatbotFooterComponent } from './chatbot-footer/chatbot-footer.component';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatBotComponent {
  @ViewChild(ChatbotBodyComponent) chatBody: ChatbotBodyComponent;
  @ViewChild(ChatbotFooterComponent) chatFooter: ChatbotFooterComponent;
  @Input('secret') secret: any = '71cc067d-7b20-41a7-a119-0a86a8dd2e11';
  expanded: boolean = false;
  spinner: boolean = true;
  organization: any;
  category: any = [];
  chatHistory: any = [];
  constructor(private api: ChatbotService, private cd: ChangeDetectorRef, private ele:ElementRef) {
    this.chatHistory = this.api.chatHistory;
  }
  ngAfterViewInit(): void {
    this.api.validator(this.secret).subscribe(data => {
      if (data.statusCode === 200) {
        this.organization = data.response.response;
        this.api.setTheme(this.ele, this.organization.theme);
        this.cd.detectChanges()
      }
    })
  }
  onToggle(value: any) {
    this.expanded = value;
    setTimeout(() => {
      this.chatFooter?.input?.nativeElement?.focus()
    }, 100);
    if (this.api.chatHistory.length == 0) {
      this.initial(this.organization?.id, '');
    } else {
      this.spinner = false;
    }
  }
  retrive(client:any, question:any){
   setTimeout(() => {
    this.chatBody.ele.nativeElement.scrollTop = this.chatBody.ele.nativeElement.scrollHeight;
   }, 100);
    this.api.retrive({ client: client, question: question }).subscribe((response:any) => {
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
    this.api.initial({ client: client, parentCategoryId: id }).subscribe((response: any) => {
      if (response.statusCode == 200) {
        if (response.response.statusCode == 200) {
          let category = response.response.response;
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
    this.retrive(this.organization?.id, question);
  }
}
