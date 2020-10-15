import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Current user information
  currentUser: string;
  currentChannel: string;
  //Channel array
  channels: string[] = [];
  //Channels under matching group array
  pairings: any[] = [];
  //All matching group and channels array
  results: any[] = [];
  //Groups collection data from MongoDB array
  groups: any = [];


  constructor(private GroupService:GroupService) { }

  //Upon start, current user is fetched and all group data is fetched with GroupService, populateDashboard is called
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem("currentUser");

    this.GroupService.getGroups().subscribe(data => {
      this.groups = data
      console.log(data);
      this.populateDashboard();
    })
  }

  //When user selects a channel, that channel is stored in session for chat room use
  selectChannel(){
    sessionStorage.setItem("currentChannel", this.currentChannel);
    console.log(sessionStorage.getItem("currentChannel") + " channel selected");
  }

  //Iterates thorugh group data for all groups and channels that match username
  populateDashboard() {
    //For each group
    for (var i in this.groups) {
      //For each user in group
      for (var j in this.groups[i]['users']) {
        //If username matches
        if (this.currentUser == this.groups[i]['users'][j]) {
          console.log(this.groups[i]['name'] + " added to Groups")
          //For each channel
          for (var k in this.groups[i]['channels']) {
            console.log(this.groups[i]['channels'][k])
            //Foe each channel user
            for (var l in this.groups[i]['channels'][k]['users']) {
              //If username matches
              if (this.currentUser == this.groups[i]['channels'][k]['users'][l]) {
                //Add Channel
                this.channels.push(this.groups[i]['channels'][k]['name']);
                console.log(this.groups[i]['channels'][k]['name'] + " added to Channels");
              }
            }
          }
          //Add Group
          this.pairings.push(this.groups[i]['name'],this.channels);
          //Add Group and Channel Pairing
          this.results.push(this.pairings);
          //Log Results
          console.log(this.results);
          console.log(this.groups[i]['name'] + " group and channels finished");
        } 
      }
    }
  }
}
