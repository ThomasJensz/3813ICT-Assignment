import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-assis',
  templateUrl: './assis.component.html',
  styleUrls: ['./assis.component.css']
})
export class AssisComponent implements OnInit {

  channelName: string;
  channelUser: string;
  channelGroup: string;
  channelObject: Object;

  groups: Object[] = [];
  users: Object[] = [];

  gUserObject: Object;
  gUserArray: String[] = [];

  cUserObject: Object;
  cUserArray: String[] = [];

  constructor(private GroupService:GroupService, private UserService:UserService) { }

  ngOnInit(): void {
    this.GroupService.getGroups().subscribe((data)=>{
      this.groups = data;
    })
    this.UserService.getUsers().subscribe((data)=>{
      this.users = data;
    })
  }

  split(input) {
    return input
  }

  splitChannelName(input) {
    var currentChannel;
    var nameArray = [];
    for (currentChannel of input) {
      nameArray.push(currentChannel.name)
    }
    console.log(nameArray);
    return nameArray;
  }

  splitChannelUsers(input) {
    var currentChannel;
    var channelArray = [];
    for (currentChannel of input) {
      channelArray.push(currentChannel.users)
    }
    console.log(channelArray);
    return channelArray;
    
  }

  createChannel() {
    this.channelObject= {
      parent: this.channelGroup,
      statement:{
        name:this.channelName, 
        users: [this.channelUser]
      }
    }
    console.log(this.channelObject);
    this.GroupService.createChannel(this.channelObject).subscribe((data)=>{
      this.groups = data;
    });
    this.channelName = "";
    this.channelUser = "";
    this.channelGroup = "";
  }

  addGUser(parentName,i){
    this.gUserObject= {
      parent: parentName,
      user: this.gUserArray[i]
    }
    console.log(this.gUserObject);
    this.GroupService.addGUser(this.gUserObject).subscribe((data)=>{
      this.groups = data;
    });
    this.gUserArray[i] = "";
  }

  deleteGUser(parentName,user){
    this.gUserObject= {
      parent: parentName,
      user: user
    }
    console.log(this.gUserObject);
    this.GroupService.deleteGUser(this.gUserObject).subscribe((data)=>{
      this.groups = data;
    });
  }

  addCUser(group,channel,i){
    this.cUserObject = {
      group: group,
      channel: channel,
      user: this.cUserArray[i]
    }
    console.log(this.cUserObject);
    this.GroupService.addCUser(this.cUserObject).subscribe((data)=>{
      this.groups = data;
    });
    this.cUserArray[i] = "";
  }

  deleteCUser(group, channel,user){
    this.cUserObject= {
      group: group,
      channel: channel,
      user: user
    }
    console.log(this.cUserObject);
    this.GroupService.deleteCUser(this.cUserObject).subscribe((data)=>{
      this.groups = data;
    });
  }

}
