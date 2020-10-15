import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  messageObject:Object;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public send(name, channel, message): void {
    this.messageObject = {
      name: name,
      channel: channel,
      message: message
    }
    this.socket.emit('message', this.messageObject);
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data));
    });
    return observable
  }

  joinRoom(name, channel) {
    this.messageObject = {
      name: name,
      channel: channel,
      message: name + " has joined " + channel
    }
    this.socket.emit('join', this.messageObject);
    console.log(this.messageObject);
  }

  leaveRoom(name, channel) {
    this.messageObject = {
      name: name,
      channel: channel,
      message: name + " has left " + channel
    }
    this.socket.emit('leave', this.messageObject);
    console.log(this.messageObject);
  }
}


