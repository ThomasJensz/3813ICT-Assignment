import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  currentUser: string = ""
  currentChannel: string = ""
  messagecontent:string = "";
  messages:string[] = [];
  ioConnnection:any;

  constructor(private socketService:SocketService) { }

  ngOnInit(): void {
    this.initToConnection();
    this.currentUser = sessionStorage.getItem("currentUser");
    this.currentChannel = sessionStorage.getItem("currentChannel");
    this.socketService.joinRoom(this.currentUser,this.currentChannel);
  }

  private initToConnection(){
    this.socketService.initSocket();
    this.ioConnnection = this.socketService.onMessage()
      .subscribe((messageObject) => {
        this.messages.push(messageObject);
      });
  }

  chat(){
    if(this.messagecontent){
      this.socketService.send(this.currentUser,this.currentChannel,this.messagecontent);
      this.messagecontent=null;
    } else {
      console.log('no message');
    }
  }

  leaveRoom() {
    this.socketService.leaveRoom(this.currentUser,this.currentChannel);
  }
}

