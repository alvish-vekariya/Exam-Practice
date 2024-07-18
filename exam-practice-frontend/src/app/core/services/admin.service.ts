import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  addQuestion(data: any){
    return this.http.post('/question/addQuestion', data);
  }

  deleteQuestion(id: string){
    return this.http.delete(`/question/deleteQuestion/${id}`);
  }

  updateQuestion(id: string, data: any){
    return this.http.put(`/question/updateQuestion/${id}`, data);
  }

  getAllQuestion(){
    return this.http.get('/question/getAllQuestions');
  }

  getUserStats(id: string){
    return this.http.get(`/admin/getUserStats/${id}`)
  }

  totalExamCount(){
    return this.http.get(`/admin/totalExamCount`);
  }

  getUserCount(){
    return this.http.get(`/admin/getUserCount`);
  }

  getAllUsers(){
    return this.http.get('/admin/getAllUsers');
  }

  deleteUser(id: string){
    return this.http.delete(`/admin/deleteUser/${id}`);
  }

  getQuestion(id: string){
    return this.http.get(`/question/getQuestion/${id}`);
  }

  adminHome(){
    return this.http.get('/admin/homeStats');
  }
}
