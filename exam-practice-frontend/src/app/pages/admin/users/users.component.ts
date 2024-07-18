import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { ColDef } from 'ag-grid-community';
import { UserActionsComponent } from './user-actions/user-actions.component';
import { ToastService } from 'angular-toastify';
import { ProfilesComponent } from './profiles/profiles.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  rowData: any;
  colDefs: ColDef[]= [
    {field : 'profile', cellRenderer : ProfilesComponent},
    {field : '_id', headerName : "userID", flex: 1},
    {field : 'username', headerName : "username", flex: 1},
    {field : 'email', headerName : "email", flex: 1},
    {field : 'createdAt', headerName : "registeredAt", flex: 1},
    {field : 'actions', flex: 1, cellRenderer: UserActionsComponent, cellRendererParams : {
      delete :(id: string)=> this.delete(id),
      update : (id: string)=> this.update(id),
      history : (id: string)=> this.history(id)
    }},
    
  ];

  delete(id: string){
    this.adminService.deleteUser(id).subscribe((data:any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.getUsers()
      }else{
        this.ts.error(data.message)
      }
    })
  }

  history(id: string){
    this.router.navigate(['admin','users',`${id}`]);
  }
  
  update(id: string){
    console.log(id);
  }

  constructor(private adminService: AdminService, private ts : ToastService, private router: Router){}

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.adminService.getAllUsers().subscribe((data: any)=>{
      this.rowData = data.data
    })
  }
}
