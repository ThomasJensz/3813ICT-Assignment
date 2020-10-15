import { Component, OnInit } from '@angular/core';
import { User } from '../users.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  idContent:String;
  usernameContent:String;
  passwordContent: String
  emailContent:String;
  roleContent:String;
  newUser:Object;
  deleteObject: Object;
  updateObject: Object;
  
  roleArray: String[] = [];
  users: Object[] = [];

  constructor(private UserService:UserService) { }

  ngOnInit() {
    this.UserService.getUsers().subscribe((data)=>{
      this.users = data;
    })
  }

  addNewUser() {
    this.newUser = {
      id: this.idContent,
      username: this.usernameContent,
      password: this.passwordContent,
      email: this.emailContent,
      role: this.roleContent
    };
    this.UserService.add(this.newUser).subscribe((data)=>{
      console.log(data)
      this.idContent = "";
      this.usernameContent = "";
      this.passwordContent = "";
      this.emailContent = "";
      this.roleContent = "";
    });
  }
  
  deleteUser(id) {
    this.deleteObject = {
      id: id
    }
    this.UserService.deleteUser(this.deleteObject).subscribe((data)=>{
      this.users = data;
    });
  }

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