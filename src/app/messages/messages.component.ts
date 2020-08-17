import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form} from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: string;
  messages;
  user: any;
  roomId: string;
  _messageSub: Subscription;
  private isTyping = false;
  constructor(private webSocketService: WebSocketService,
    private cookieService: CookieService) { 
      this.webSocketService.newMessageReceived().subscribe(data => {
        console.log(data);
        this.messages.push(data);
        this.isTyping = false;
        console.log(this.messages);
      });
      this.webSocketService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
      });
    }

  ngOnInit(): void {
    this._messageSub = this.webSocketService.messages.subscribe((messages)=>{
      console.log("messages", messages);
      this.roomId = messages[0].room_id;
      this.messages=messages;
    });
    this.user = JSON.parse(this.cookieService.get('Test'));
  }
  sendMessage(){
    //console.log(this.message);
    var data={
      room_id: this.roomId,
      message:{
        content: this.message,
        sent_by: this.user.id
      },
    }
    this.webSocketService.sendMessage(data);
    /* this.webSocketService.listen('new-message').subscribe((data)=>{
      console.log(data);
      
    });  */
    //this.messages.push(this.message);
    this.message = '';
  }

  typing() {
    this.webSocketService.typing({room_id: this.roomId});
  }

  ngOnDestroy(){
    this._messageSub.unsubscribe();
  }

}
