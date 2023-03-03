import { Component } from '@angular/core';
import { searchPaymentTableColumns } from './search-payment-table.constants';
import { searchPaymentMock } from '../search-payment.mock';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent {
  tableColumns = searchPaymentTableColumns;
  tableData = searchPaymentMock;

  onRowSelected(e: any) {
    console.log(e);
  }

  generateReport() {
    XlsxHelper.exportArrayToExcel(searchPaymentMock, Object.getOwnPropertyNames(searchPaymentMock[0]), "Выгрузка_в_excel_test");
  }

}
