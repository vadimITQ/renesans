import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { PaymentTypes } from 'src/app/shared/enums/manual-checks.enums';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { commentaryExpr, commentaryLength } from 'src/app/shared/variables/pe-input-validations';
import { PaymentOrderWService } from '../../../../services/payment-order-w/payment-order-w.service';
import { lastValueFrom } from 'rxjs';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manual-checks-result',
  templateUrl: './manual-checks-result.component.html',
  styleUrls: ['./manual-checks-result.component.scss']
})
export class ManualChecksResultComponent implements OnInit {

  constructor(
    private mcService: ManualChecksService, 
    private paymentOrderW: PaymentOrderWService, 
    private location: Location,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ){ }

  public readonly COMMENTARY_EXPR = commentaryExpr;
  public readonly COMMENTARY_LENGTH = commentaryLength;
  public paymentResponse: GetPaymentsResponse[] | null | undefined = undefined;
  public types = PaymentTypes;
  public selectedAll: boolean = false;
  public selection: any[] = [];
  public commentary: string = "";

  public cols = [
    {field: 'paymentID', header: 'ID PE'},
    {field: 'applicationID', header: 'ID заявки'},
    {field: 'paymentHubPaymentId', header: 'ID PH'},
    {field: 'pmtCreationTime', header: 'Дата заявки в PE'},
    {field: 'plannedDate', header: 'Дата исполнения платежа'},
    {field: 'amount', header: 'Сумма'},
    {field: 'type', header: 'Тип перевода'},
    {field: 'statusPE', header: 'Статус PE'},
    {field: 'errorType', header: 'Тип ошибки'}
  ]

  @ViewChild("manualChecksTable") manualChecksTable!: Table;

  ngOnInit(): void {
    this.mcService.$paymentResponseState.subscribe(paymentData => {
      this.paymentResponse = paymentData;
    });
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

  cancelPayments(){
    this.dialogService.showConfirmDialog({
      message: "Вы действительно хотите отменить платеж/перевод?",
      header: "Подтверждение",
      accept: {
        label: "Да",
        handler: () => this.loadingService.attach(lastValueFrom(this.paymentOrderW.cancelPayment()))
      },
      reject: {
        label: "Нет"
      }
    });
  }
  
  resumePayments(){
    this.dialogService.showConfirmDialog({
      message: "Вы действительно хотите отменить платеж/перевод?",
      header: "Подтверждение",
      accept: {
        label: "Да",
        handler: () => this.loadingService.attach(this.paymentOrderW.resumePayment())
      },
      reject: {
        label: "Нет"
      }
    });
  }

  get paymentResponseProps(): string[] {
    return Object.getOwnPropertyNames(this.paymentResponse);
  }

}
