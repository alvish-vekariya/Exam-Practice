import { Component } from '@angular/core';
import {ColDef} from 'ag-grid-community'
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  rowData: any;
  stats: any;
  colDefs : ColDef[] = [
    {field : "_id", flex: 1},
    {field : "score", flex:1},
    {field : "percentage", flex: 1},
    {field : "createdAt", flex: 1, headerName :"Given At"}
  ]

  constructor(private userService: UserService){}

  ngOnInit(){
    this.getHistory();
  }

  getHistory(){
    this.userService.getUserHistory().subscribe((data: any)=>{
      this.rowData = data.data;
      this.stats = data.stats
    })
  }
}
