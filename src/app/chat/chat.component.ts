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

  //Current user information
  currentUser: string = ""
  currentChannel: string = ""
  //Individual message variable
  messagecontent:string = "";
  //Messages array
  messages:string[] = [];
  //Socket-IO Connection
  ioConnnection:any;

  constructor(private socketService:SocketService) { }

  //Upon start, start connection to server, user information is used ot join room
  ngOnInit(): void {
    this.initToConnection();
    this.currentUser = sessionStorage.getItem("currentUser");
    this.currentChannel = sessionStorage.getItem("currentChannel");
    this.socketService.joinRoom(this.currentUser,this.currentChannel);
  }

  //Initialise socket, when message is ready, send message to server, add returning message to array
  private initToConnection(){
    this.socketService.initSocket();
    this.ioConnnection = this.socketService.onMessage()
      .subscribe((messageObject) => {
        this.messages.push(messageObject);
      });
  }
  //If there is message content, send message, username and channel info
  chat(){
    if(this.messagecontent){
      this.socketService.send(this.currentUser,this.currentChannel,this.messagecontent);
      this.messagecontent=null;
    } else {
      console.log('no message');
    }
  }
  //Uses user information to leave room
  leaveRoom() {
    this.socketService.leaveRoom(this.currentUser,this.currentChannel);
  }
}

