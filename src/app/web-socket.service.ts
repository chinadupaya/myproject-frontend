import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private apiUrl= "http://localhost:3000";
  currentRoom = this.socket.fromEvent<any>('room');
  rooms = this.socket.fromEvent<any[]>('rooms');
  messages = this.socket.fromEvent<any[]>('messages');
  constructor(public socket: Socket, private cookieService: CookieService) {
    //this.socket = io(this.apiUrl);
  }
  //socket:any;
  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName,(data)=>{
        //console.log("listen",eventName, data)
        subscriber.next(data);
      })
    })
  }
  createRoom(userIdOne, userIdTwo, nameOne, nameTwo){
    var users = {
      one: userIdOne,
      two: userIdTwo,
      nameOne: nameOne,
      nameTwo: nameTwo
    }
    this.socket.emit('createRoom', users);
  }
  getChatList(userId){
    console.log("getChatList", userId);
    this.socket.emit('chatrooms', userId);
    
  }
  getRoom(id: string){
    this.socket.emit('getRoom', id);
  }
  typing(data) {
    this.socket.emit('typing', data);
  }
  sendMessage(data){
    this.socket.emit('new-message',data);
    //console.log('sendMessage',message)
  }
  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
