import { Component, OnInit } from '@angular/core';
import { User } from '../users.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  //Variables to store input fields values
  idContent:String;
  usernameContent:String;
  passwordContent: String
  emailContent:String;
  roleContent:String;
  //Combinations of the previous values into structures
  newUser:Object;
  deleteObject: Object;
  updateObject: Object;
  
  roleArray: String[] = [];
  //User data array
  users: Object[] = [];

  constructor(private UserService:UserService) { }

  //Upon start, fetch all user data using UserService, store in users array
  ngOnInit() {
    this.UserService.getUsers().subscribe((data)=>{
      this.users = data;
    })
  }
  //Using UserService, add a new user, return updated user array
  addNewUser() {
    //Define user obect
    this.newUser = {
      id: this.idContent,
      username: this.usernameContent,
      password: this.passwordContent,
      email: this.emailContent,
      role: this.roleContent
    };
    //Call service function and subscribe to updates
    this.UserService.add(this.newUser).subscribe((data)=>{
      console.log(data)
      //Reset fields
      this.idContent = "";
      this.usernameContent = "";
      this.passwordContent = "";
      this.emailContent = "";
      this.roleContent = "";
    });
  }
  //Using UserService, delete a user based on id value, return updated user array
  deleteUser(id) {
    //Define id object
    this.deleteObject = {
      id: id
    }
    //Call service function and subscribe to updates
    this.UserService.deleteUser(this.deleteObject).subscribe((data)=>{
      this.users = data;
    });
  }
  //Using UserService, change role value of a user based on id, gets role value from array with i
  updateRole(id, i) {
    //Define update object
    this.updateObject = {
      id: id,
      role: this.roleArray[i]
    }
    //Call service function and subscribe to updates
    this.UserService.updateRole(this.updateObject).subscribe((data)=>{
      this.users = data;
    });
  }
}