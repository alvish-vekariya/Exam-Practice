import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  constructor(private route : ActivatedRoute, private router: Router, private adminService: AdminService){}

  rowData : any;
  stats : any;
  colDefs : ColDef[] = [
    {field : '_id', flex: 1},
    {field : 'score', flex: 1},
    {field: 'percentage', flex: 1},
    {field : 'difficulty', flex: 1}
  ]

  getUserHistory(){
    const userId = this.route.snapshot.paramMap.get('id');
    this.adminService.getUserStats(userId as string).subscribe((data: any)=>{
      this.rowData = data.history;
      this.stats = data.stats
    })
  }
  ngOnInit(){
    this.getUserHistory();
  }
}
