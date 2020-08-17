import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  rooms: Observable<any[]>;
  currentRoom: string;
  private _roomSub: Subscription;
  constructor(private webSocketService: WebSocketService,
    private cookieService: CookieService,
    private socket: Socket) { }

  ngOnInit(): void {
    this.getChatLists();
    this.rooms = this.webSocketService.rooms;
    console.log(this.rooms);
    this._roomSub = this.webSocketService.currentRoom.subscribe(room=>{
      this.currentRoom = Object.keys(room)[0];
    })
    //console.log(this.rooms);
  }
  getChatLists(){
    //console.log("getChatlist")
    var userObj = JSON.parse(this.cookieService.get('Test'));
    this.webSocketService.getChatList(userObj.id);
  }
  loadRoom(roomId){
    this.webSocketService.getRoom(roomId)
  }

  ngOnDestroy():void{
    this._roomSub.unsubscribe();
  }
}
