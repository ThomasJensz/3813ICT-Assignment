import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Variables to store content of text fields
  usernameContent: string = '';
  passwordContent: string = '';
  //Fetch the user data from main app
  signInStatus: boolean = this.mainApp.signInStatus;
  failStatus: boolean = this.mainApp.failStatus;
  //Variable for all user data
  users: any = [];

  constructor(private httpClient: HttpClient, public mainApp: AppComponent, private UserService: UserService) { }

  //Upon start, all user data is fetched using the UserServce, stored in users
  ngOnInit(): void {
    this.UserService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  
  }

  //The user array is iterated through, looking for matches for both the entered username and password, signing the user in if found
  checkUser() {
    //For each user
    for (var i in this.users) {
      //If username matches
      if (this.usernameContent == this.users[i]['username']) {
        //If password matches
        if (this.passwordContent == this.users[i]['password']) {
          //Sign in information
          sessionStorage.setItem("currentUser", this.usernameContent);
          console.log("User Found: " + sessionStorage.getItem("currentUser"));
          this.mainApp.currentUser = sessionStorage.getItem("currentUser");
          this.mainApp.currentRole = this.users[i]['role'];
          this.signInStatus = true;
          this.mainApp.signInStatus = true;
          this.mainApp.failStatus = false;
          //Stop iterating
          break
        }
      }
    }
    //If no matches found, update sign in status
    this.failStatus = true;
    this.mainApp.failStatus = true;
  }

}
