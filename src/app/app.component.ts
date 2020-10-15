import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatCentre';
  currentUser = "Guest"
  currentRole = "assis";
  signInStatus = false;
  failStatus = false;
  
  logout() {
    localStorage.setItem("currentUser","invalid"); 
    console.log("Logged Out");
    this.currentUser = "Guest";
    this.currentRole = "";
    this.signInStatus = false;
    this.failStatus = false;
  }
}
