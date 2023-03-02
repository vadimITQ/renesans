import { Component } from '@angular/core';
import { searchPaymentTableColumns } from './search-payment-table.constants';

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent {
  tableColumns = searchPaymentTableColumns;
  tableData = [];

  onRowSelected(e: any) {
    console.log(e);
  }
}
