import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';
import { ChatMessage } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor() { }

  public openWebSocket(name: string) {
    console.log(name);
    console.log(`wss://014hye0l47.execute-api.ap-south-1.amazonaws.com/dev?name=${name}`);
    this.webSocket = new WebSocket(`wss://014hye0l47.execute-api.ap-south-1.amazonaws.com/dev?name=${name}`);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log(event);
      const chatMessageDto = event.data;
      this.chatMessages.push(JSON.parse(chatMessageDto));
      console.log("this.chatMessages", this.chatMessages);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    const chatMessageDme = {
        name: chatMessageDto.data.name,
        msg: chatMessageDto.data.msg
    };
    console.log("chatMessageDme-->",chatMessageDme);
    this.chatMessages.push(chatMessageDme);
    console.log("message-->", JSON.stringify(chatMessageDto));
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
