import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  get local(){
    return localStorage.getItem('user');
  }

  get token(){
    return JSON.parse(localStorage.getItem('user') as string).token;
  }

  get role(){
    return JSON.parse(localStorage.getItem('user') as string).role;
  }
}
