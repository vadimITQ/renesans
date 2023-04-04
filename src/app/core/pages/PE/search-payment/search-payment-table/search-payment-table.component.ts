import { Component, OnDestroy, OnInit } from '@angular/core';
import { IColumn, searchPaymentTableColumns } from './search-payment-table.constants';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { SearchPaymentService } from 'src/app/core/services/search-payment/search-payment.service';
import { Subscription } from 'rxjs';
import { ISearchPayment } from '../search-payment.types';
import { generateReport_prepareDataToExportXlsx, prepareSearchPaymentsData } from './search-payment-table.utils';
import { PaymentTypes } from "../../../../../shared/enums/manual-checks.enums";
import { ToastService } from "../../../../../shared/services/toast.service";
import { DatePipe } from '@angular/common';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { ISearchPaymentsResponse } from 'src/app/core/services/search-payment/types';
import {PeRolesService} from "../../../../services/auth/pe-roles.service";

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent implements OnInit, OnDestroy {
  constructor(private searchPaymentService: SearchPaymentService,
              private toastService: ToastService,
              private datePipe: DatePipe,
              private peNavigationService: PeNavigationService,
              private peRolesService: PeRolesService

  ) {}

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscription){
      this.paymentResponseStateSubscription.unsubscribe();
    }
  }

  public tableColumns: IColumn[] = searchPaymentTableColumns;
  public tableData: ISearchPayment[] | null = null;
  public loading: boolean = false;
  public paymentResponse: ISearchPaymentsResponse[] | null = [];
  private paymentResponseStateSubscription!: Subscription;

  onRowSelected(e: any) {

  }

  generateReport() {
    if (!this.tableData) {
      return;
    }
    const { arrayData, heading, fileName } = generateReport_prepareDataToExportXlsx(this.paymentResponse, this.datePipe);
    XlsxHelper.exportArrayToExcel(arrayData, heading, fileName);
  }

  paymentIdClick(id: string) {
    this.peNavigationService.goToViewTransferDetails(id);
  }

  generateSbpReport() {
    if (!this.tableData) {
      return;
    }

    XlsxHelper.exportArrayToExcel(this.tableData.filter(({type})=> type === PaymentTypes.EXT_SBP || type === PaymentTypes.INC_SBP), Object.getOwnPropertyNames(this.tableData[0]), 'Выгрузка_в_excel_test');
  }

  get hasAccessToViewTransferDetails() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  ngOnInit(): void {
    this.paymentResponse = this.searchPaymentService.$paymentResponseState.value ?? [];
    if (this.paymentResponse.length > 0){
      this.tableData = prepareSearchPaymentsData(this.paymentResponse, this.datePipe);
    }
    this.paymentResponseStateSubscription = this.searchPaymentService.$paymentResponseState.subscribe(paymentResponse => {
      this.paymentResponse = paymentResponse;
      this.tableData = paymentResponse ? prepareSearchPaymentsData(paymentResponse, this.datePipe) : null;
    });

    this.searchPaymentService.$loading.subscribe(loading => {
      this.loading = loading;
    });
  }
}
