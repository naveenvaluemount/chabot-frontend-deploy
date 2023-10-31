import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';
import chroma from "chroma-js";
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  public set chatHistory(data: any) {
    localStorage.setItem('chatHistory', JSON.stringify(data));
  }
  public get chatHistory(): string {
    return JSON.parse(localStorage.getItem("chatHistory")) || [];
  }
  constructor(private http: HttpClient) { }
  // validator(secret: any): Observable<any> {
  //   return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.organization.validator}${secret}`, null);
  // }
  validator(params: any): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.organization.validator}`, {params: params});
  }
  faq(id: any): Observable<any> {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.faqs.single}${id}`);
  }
  retrive(params: any) {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.chatbot.retrive}`, { params: params })
  }
  initial(params: any) {
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.chatbot.category}`, { params: params })
  }
  sendMessage(data: any) {
    return this.http.post(`${environment.baseurl}${environment.api}${environment.endpoints.chatbot.sendMessage}`, data)
  }
  getMessages(id: any){
    return this.http.get(`${environment.baseurl}${environment.api}${environment.endpoints.chatbot.getMessages}${id}`)
  }
  setTheme(ele: any, theme: any) {
    ele.nativeElement.style.setProperty("--chatbot-window-backgound", theme?.windowTitleBackgroundColor);
    ele.nativeElement.style.setProperty("--chatbot-window-text", theme?.windowTitleTextColor);
    ele.nativeElement.style.setProperty("--chatbot-message-background", theme?.chatbotBackgroundColor);
    ele.nativeElement.style.setProperty("--chatbot-message-text", theme?.chatbotTextColor);
    ele.nativeElement.style.setProperty("--chatbot-message-user-background", theme?.messageBackgroundColor);
    ele.nativeElement.style.setProperty("--chatbot-message-user-text", theme?.userMessageTextColor);
    ele.nativeElement.style.setProperty("--chatbot-button-background", theme?.buttonBackgroundColor);
    ele.nativeElement.style.setProperty("--chatbot-button-text", theme?.buttonTextColor);
    ele.nativeElement.style.setProperty("--chatbot-button-hover-background", theme?.buttonHoverBackgroundColor);
    ele.nativeElement.style.setProperty("--chatbot-button-hover-text", theme?.buttonHoverTextColor);
  }
}
