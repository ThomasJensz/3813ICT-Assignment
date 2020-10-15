import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //The name of the application
  title = 'ChatCentre';
  //Variables to store user information upon sign in, and sign in status
  currentUser = "Guest"
  currentRole = "";
  signInStatus = false;
  failStatus = false;
  
  //Resets the user variables so that a new user can log in
  logout() {
    localStorage.setItem("currentUser","invalid"); 
    console.log("Logged Out");
    this.currentUser = "Guest";
    this.currentRole = "";
    this.signInStatus = false;
    this.failStatus = false;
  }
}
