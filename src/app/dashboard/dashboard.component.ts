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

  currentUser: string;
  currentChannel: string;
  channels: string[] = [];
  pairings: any[] = [];
  results: any[] = [];

  groups: any = [];


  constructor(private GroupService:GroupService) { }

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem("currentUser");

    this.GroupService.getGroups().subscribe(data => {
      this.groups = data
      console.log(data);
      this.populateDashboard();
    })
  }

  selectChannel(){
    sessionStorage.setItem("currentChannel", this.currentChannel);
    console.log(sessionStorage.getItem("currentChannel") + " channel selected");
  }

  populateDashboard() {
    for (var i in this.groups) {
      for (var j in this.groups[i]['users']) {
        if (this.currentUser == this.groups[i]['users'][j]) {
          console.log(this.groups[i]['name'] + " added to Groups")
          for (var k in this.groups[i]['channels']) {
            console.log(this.groups[i]['channels'][k])
            for (var l in this.groups[i]['channels'][k]['users']) {
              if (this.currentUser == this.groups[i]['channels'][k]['users'][l]) {
                this.channels.push(this.groups[i]['channels'][k]['name']);
                console.log(this.groups[i]['channels'][k]['name'] + " added to Channels");
              }
            }
          }
          this.pairings.push(this.groups[i]['name'],this.channels);
          this.results.push(this.pairings);
          console.log(this.results);
          console.log(this.groups[i]['name'] + " group and channels finished");
        } 
      }
    }
  }
}
