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

  usernameContent: string = '';
  passwordContent: string = '';
  signInStatus: boolean = this.mainApp.signInStatus;
  failStatus: boolean = this.mainApp.failStatus;
  users: any = [];

  constructor(private httpClient: HttpClient, public mainApp: AppComponent, private UserService: UserService) { }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    })
  
  }

  checkUser() {
    for (var i in this.users) {
      if (this.usernameContent == this.users[i]['username']) {
        if (this.passwordContent == this.users[i]['password']) {
          sessionStorage.setItem("currentUser", this.usernameContent);
          console.log("User Found: " + sessionStorage.getItem("currentUser"));
          this.mainApp.currentUser = sessionStorage.getItem("currentUser");
          this.mainApp.currentRole = this.users[i]['role'];
          this.signInStatus = true;
          this.mainApp.signInStatus = true;
          this.mainApp.failStatus = false;
          break
        }
      }
    }
    this.failStatus = true;
    this.mainApp.failStatus = true;
  }

}
