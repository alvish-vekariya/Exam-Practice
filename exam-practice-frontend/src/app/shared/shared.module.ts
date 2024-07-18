import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridAngular } from 'ag-grid-angular';



@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    AgGridAngular
  ],
  exports : [
    DatatableComponent
  ]
})
export class SharedModule { }
