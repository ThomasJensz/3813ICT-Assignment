import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }

  add(user:User){
    return this.http.post<any>('http://localhost:3000/api/add',user);
  }

  getUsers(){
    return this.http.get<any>('http://localhost:3000/api/getUsers');
  }

  deleteUser(id){
    return this.http.post<any>('http://localhost:3000/api/deleteUser',id);
  }

  updateRole(id){
    return this.http.post<any>('http://localhost:3000/api/updateRole',id);
  }
}
