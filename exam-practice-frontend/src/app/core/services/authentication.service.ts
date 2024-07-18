import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }

  login(email: string, password: string){
    return this.http.post('/user/login', {email : email, password : password});
  }

  logout(){
    return this.http.post('/user/logout',{});
  }
  
  signup(data: FormData){
    return this.http.post('/user/signup', data);
  }

}
