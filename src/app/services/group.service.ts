import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  getGroups(){
    return this.http.get<any>('http://localhost:3000/api/getGroups');
  }

  createGroup(group){
    return this.http.post<any>('http://localhost:3000/api/createGroup',group);
  }

  createChannel(channel){
    return this.http.post<any>('http://localhost:3000/api/createChannel',channel);
  }

  addGUser(user){
    return this.http.post<any>('http://localhost:3000/api/createGUser',user);
  }

  deleteGUser(user){
    return this.http.post<any>('http://localhost:3000/api/deleteGUser',user);
  }

  addCUser(user){
    return this.http.post<any>('http://localhost:3000/api/createCUser',user);
  }

  deleteCUser(user){
    return this.http.post<any>('http://localhost:3000/api/deleteCUser',user);
  }
}
