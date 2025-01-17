import { Component, Input } from '@angular/core';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  // Row Data: The data to be displayed.

  @Input() rowData !: any;
  @Input() colDefs !: ColDef[];

}
