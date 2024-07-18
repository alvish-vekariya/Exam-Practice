import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  getUserHistory(){
    return this.http.get('/user/getHistory');
  }

  updateProfile(data: FormData){
    return this.http.put('/user/updateProfile', data);
  }
  getUser(){
    return this.http.get('/user/getDetails');
  }

  getStats(){
    return this.http.get('/user/getStats');
  }
}
