import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private adminService : AdminService){}

  ngOnInit(){
    this.getStats();
  }

  exams !: number;
  users !: number;
  questions !: number;

  getStats(){
    this.adminService.adminHome().subscribe((data: any)=>{
      this.exams = data.exams;
      this.questions = data.questions;
      this.users = data.users;  
    })
  }
}
