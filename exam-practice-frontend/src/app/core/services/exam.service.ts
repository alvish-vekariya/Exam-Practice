import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  startQuiz(){
    return this.http.get('/exam/startQuiz');
  }

  submitQuiz(data: any){
    return this.http.post('/exam/submitQuiz', data);
  }
}
