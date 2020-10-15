import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core'; 
import { group } from 'console';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  //Group information
  groupName: string;
  groupUser: string;
  groupChannel: string;
  createStatement: Object;
  //Channel Information
  channelName: string;
  channelUser: string;
  channelGroup: string;
  channelObject: Object;
  //Group User Info
  gUserObject: Object;
  gUserArray: String[] = [];
  //Class User Info
  cUserObject: Object;
  cUserArray: String[] = [];
  //Groups data from MongoDB
  groups: Object[] = [];
  //User data from MongoDB
  users: Object[] = [];

  roleArray: String[] = [];

  updateObject: Object;

  constructor(private GroupService:GroupService, private UserService:UserService) { }
  //Upon start, fetch user data and group dat and store in respective arrays
  ngOnInit(): void {
    this.GroupService.getGroups().subscribe((data)=>{
      this.groups = data;
    })
    this.UserService.getUsers().subscribe((data)=>{
      this.users = data;
    })
  }
  //Returns input as array which can be iterated
  split(input) {
    return input
  }
  //Defunct fucntion
  splitChannelName(input) {
    var currentChannel;
    var nameArray = [];
    for (currentChannel of input) {
      nameArray.push(currentChannel.name)
    }
    console.log(nameArray);
    return nameArray;
  }
  //Defunct function
  splitChannelUsers(input) {
    var currentChannel;
    var channelArray = [];
    for (currentChannel of input) {
      channelArray.push(currentChannel.users)
    }
    console.log(channelArray);
    return channelArray;
    
  }
  //Creates group and adds to Group Collection, resets input fields
  createGroup() {
    //Defines object in accordance with MOngoDB structure for insertion
    this.createStatement = {
      name:this.groupName,
      users:[this.groupUser],
      channels:[
        {
          name:this.groupChannel, 
          users: [this.groupUser]
        }
      ]
    };
    console.log(this.createStatement);
    //Call GroupService function to add group to database, subscribe to updates
    this.GroupService.createGroup(this.createStatement).subscribe((data)=>{
      this.groups = data;
    });
    //Reset fields
    this.groupName = "";
    this.groupUser = "";
    this.groupChannel = "";
  }
  //Creates a new channel, adds to Groups colection, resets fields
  createChannel() {
    //Defines object in accordance with MOngoDB strucutre for channel insertion
    this.channelObject= {
      parent: this.channelGroup,
      statement:{
        name:this.channelName, 
        users: [this.channelUser]
      }
    }
    console.log(this.channelObject);
    //Use GroupService to send object for insertion, subscribe for updates
    this.GroupService.createChannel(this.channelObject).subscribe((data)=>{
      this.groups = data;
    });
    //Reset fields
    this.channelName = "";
    this.channelUser = "";
    this.channelGroup = "";
  }
  //Adds a user to group listing
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
  //Deletes a user from group lisiting
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
  //Adds user to channel listing
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
  //Deletes a user from channel lsiting
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
  //Updates role of user based on if value
  updateRole(id, i) {
    this.updateObject = {
      id: id,
      role: this.roleArray[i]
    }
    this.UserService.updateRole(this.updateObject).subscribe((data)=>{
      this.users = data;
    });
  }
}
