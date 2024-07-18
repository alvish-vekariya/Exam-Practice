import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements ICellRendererAngularComp {

  params: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params  
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false
  }
}
