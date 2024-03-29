import { Component, OnDestroy, OnInit } from '@angular/core';
import { searchPaymentTableColumns } from './search-payment-table.constants';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { SearchPaymentService } from 'src/app/core/services/search-payment/search-payment.service';
import { Subscription } from 'rxjs';
import { ISearchPaymentTableData } from '../search-payment.types';
import { prepareSearchPaymentsData } from './search-payment-table.utils';
import { ToastService } from '../../../../../shared/services/toast.service';
import { DatePipe } from '@angular/common';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { ISearchPayment } from 'src/app/core/services/search-payment/types';
import { PeRolesService } from '../../../../services/auth/pe-roles.service';
import {IColumn} from "../../../../../shared/types/table.types";

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent implements OnInit, OnDestroy {
  constructor(
    public searchPaymentService: SearchPaymentService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService,
  ) {}

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscription) {
      this.paymentResponseStateSubscription.unsubscribe();
    }
  }

  public tableColumns: IColumn[] = searchPaymentTableColumns;
  public tableData: ISearchPaymentTableData[] | null = null;
  public paymentResponse: ISearchPayment[] | null = [];
  private paymentResponseStateSubscription!: Subscription;

  generateReport() {
    this.searchPaymentService
      .getPaymentsReport()
      .subscribe(value =>
        value ? XlsxHelper.saveAsExcelFile(value, `Отчет по платежам_${this.datePipe.transform(new Date(), 'ddMMYYYY')}`) : this.toastService.showErrorToast('Не удалось сформировать отчёт. Попробуйте еще раз'),
      );
  }

  paymentIdClick(id: string) {
    this.peNavigationService.goToViewTransferDetails(id);
  }

  generateSbpReport() {
    this.searchPaymentService
      .getPaymentsReport()
      .subscribe(value =>
        value ? XlsxHelper.saveAsExcelFile(value, `Отчет по платежам_${this.datePipe.transform(new Date(), 'ddMMYYYY')}`) : this.toastService.showErrorToast('Не удалось сформировать отчёт. Попробуйте еще раз'),
      );
  }

  get hasAccessToViewTransferDetails() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  ngOnInit(): void {
    this.paymentResponse = this.searchPaymentService.$tableData.value ?? [];
    if (this.paymentResponse.length > 0) {
      this.tableData = prepareSearchPaymentsData(this.paymentResponse, this.datePipe);
    }
    this.paymentResponseStateSubscription = this.searchPaymentService.$tableData.subscribe(paymentResponse => {
      this.paymentResponse = paymentResponse;
      this.tableData = paymentResponse ? prepareSearchPaymentsData(paymentResponse, this.datePipe) : null;
    });
  }
}
