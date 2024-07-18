import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements ICellRendererAngularComp {

  params: any;
  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

  delete(){
    this.params.delete(this.params.data._id);
  }

  update(){
    this.params.update(this.params.data._id);
  }
  
  history(){
    this.params.history(this.params.data._id);
  }
}
