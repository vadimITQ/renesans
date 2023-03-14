import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { PaymentTypes } from 'src/app/shared/enums/manual-checks.enums';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { commentaryExpr, commentaryLength } from 'src/app/shared/variables/pe-input-validations';
import { PaymentOrderWService } from '../../../../services/payment-order-w/payment-order-w.service';
import { Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { RouterPath } from '../../../../../shared/enums/router.enums';
import { ToastService } from 'src/app/shared/services/toast.service';
import { rowStatusesColors } from "src/app/shared/variables/manual-checks-row-statuses";

@Component({
  selector: 'app-manual-checks-result',
  templateUrl: './manual-checks-result.component.html',
  styleUrls: ['./manual-checks-result.component.scss'],
})
export class ManualChecksResultComponent implements OnInit, OnDestroy {

  constructor(
    private mcService: ManualChecksService,
    private paymentOrderW: PaymentOrderWService,
    private location: Location,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToastService
  ) {}

  public readonly COMMENTARY_EXPR = commentaryExpr;
  public readonly COMMENTARY_LENGTH = commentaryLength;
  public paymentResponse: GetPaymentsResponse[] | null | undefined = undefined;
  public types = PaymentTypes;
  public selectedAll: boolean = false;
  public selection: any[] = [];
  public commentary: string = '';
  private paymentResponseStateSubscribtion!: Subscription;
  public rowStatusesColors = rowStatusesColors;

  public cols = [
    {field: 'paymentID', header: 'ID PE'},
    {field: 'applicationID', header: 'ID заявки'},
    {field: 'paymentHubPaymentId', header: 'ID PH'},
    {field: 'pmtCreationTime', header: 'Дата заявки в PE'},
    {field: 'plannedDate', header: 'Дата исполнения платежа'},
    {field: 'amount', header: 'Сумма'},
    {field: 'type', header: 'Тип перевода'},
    {field: 'statusCodePE', header: 'Код статуса'},
    {field: 'statusPE', header: 'Статус PE'},
    {field: 'errorType', header: 'Тип ошибки'}
  ]

  @ViewChild('manualChecksTable') manualChecksTable!: Table;

  ngOnInit(): void {
    this.paymentResponseStateSubscribtion = this.mcService.$paymentResponseState.subscribe(paymentData => {
      this.paymentResponse = paymentData;
    });
  }

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscribtion){
      this.paymentResponseStateSubscribtion.unsubscribe();
    }
  }

  onRowSelected(e: any) {
    console.log(e);
    console.log(this.selection);
  }

  onHeaderCheckboxToggle(e: any) {
    console.log(e);
    console.log(this.selection);
  }

  back() {
    this.location.back();
  }

  cancelPayments() {
    this.dialogService.showConfirmDialog({
      message: 'Вы действительно хотите отменить платеж/перевод?',
      header: 'Подтверждение',
      accept: {
        label: 'Да',
        handler: () => this.loadingService.attach(this.paymentOrderW.cancelPayment()).then(() => {
          this.toasterService.showSuccessToast("Запрос на отмену платежа/перевода отправлен успешно");
        }),
      },
      reject: {
        label: 'Нет',
      },
    });
  }
  
  resumePayments() {
    this.dialogService.showConfirmDialog({
      message: 'Вы действительно хотите отменить платеж/перевод?',
      header: 'Подтверждение',
      accept: {
        label: 'Да',
        handler: () => this.loadingService.attach(this.paymentOrderW.resumePayment()).then(() => {
          this.toasterService.showSuccessToast("Запрос на возобновление платежа/перевода отправлен успешно");
        }),
      },
      reject: {
        label: 'Нет',
      },
    });
  }

  get paymentResponseProps(): string[] {
    return Object.getOwnPropertyNames(this.paymentResponse);
  }

  paymentIdClick(id: string) {
    this.router.navigate([RouterPath.PaymentEngine, RouterPath.ViewTransferDetails, id]);
  }


  tableCheckboxDisabled(paymentItem: GetPaymentsResponse) {
    return paymentItem.rowStatus === 'successful'
  }

}
