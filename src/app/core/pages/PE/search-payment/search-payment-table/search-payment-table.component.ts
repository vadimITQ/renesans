import { Component, OnInit } from '@angular/core';
import { IColumn, searchPaymentTableColumns } from './search-payment-table.constants';
import { searchPaymentMock } from '../search-payment.mock';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { commentaryLength } from 'src/app/shared/variables/pe-input-validations';
import { SearchPaymentService } from 'src/app/core/services/search-payment/search-payment.service';
import { Subscription } from 'rxjs';
import { ISearchPayment } from '../search-payment.types';

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent implements OnInit {

  constructor(private searchPaymentService: SearchPaymentService) {}

  public tableColumns: IColumn[] = searchPaymentTableColumns;
  public tableData: ISearchPayment[] | null | undefined = undefined;

  readonly COMMENTARY_LENGTH = commentaryLength;

  private paymentResponseStateSubscription!: Subscription;

  onRowSelected(e: any) {
    console.log(e);
  }

  generateReport() {
    XlsxHelper.exportArrayToExcel(searchPaymentMock, Object.getOwnPropertyNames(searchPaymentMock[0]), "Выгрузка_в_excel_test");
  }

  ngOnInit(): void {
    this.paymentResponseStateSubscription = this.searchPaymentService
      .$paymentResponseState
      .subscribe(paymentResponse => {
        this.tableData = paymentResponse;
      });
  }

}
