import { Component } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private userService : UserService, private ts: ToastService){}

  ngOnInit(){
    this.getStats();
  }

  exams!: number; 
  getStats(){
    this.userService.getStats().subscribe((data: any)=>{
      this.exams = data.data
    })
  }
}
