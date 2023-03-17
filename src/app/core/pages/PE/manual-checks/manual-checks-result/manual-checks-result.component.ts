import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { PaymentStatus, PaymentTypes } from 'src/app/shared/enums/manual-checks.enums';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { commentaryExpr, commentaryLength } from 'src/app/shared/variables/pe-input-validations';
import { PaymentOrderWService } from '../../../../services/payment-order-w/payment-order-w.service';
import { forkJoin, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ToastService } from 'src/app/shared/services/toast.service';
import { rowStatusesColors } from "src/app/shared/variables/manual-checks-row-statuses";
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { CancelReason } from 'src/app/core/services/payment-order-w/types';
import { ISearchPaymentsResponse } from 'src/app/core/services/search-payment/types';
import { manualChecksTransferTypes } from 'src/app/shared/variables/manual-checks-transfer-types';
import { paymentStatusObj } from 'src/app/shared/variables/payment-status';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-manual-checks-result',
  templateUrl: './manual-checks-result.component.html',
  styleUrls: ['./manual-checks-result.component.scss'],
})
export class ManualChecksResultComponent implements OnInit, OnDestroy {

  constructor(
    private mcService: ManualChecksService,
    private paymentOrderW: PaymentOrderWService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private toasterService: ToastService,
    private peNavigationService: PeNavigationService,
    private authService: AuthService
  ) {}

  public readonly COMMENTARY_EXPR = commentaryExpr;
  public readonly COMMENTARY_LENGTH = commentaryLength;
  public paymentResponse: ISearchPaymentsResponse[] | null | undefined = undefined;
  public types = this.prepareTypes(Object.entries(PaymentTypes));
  public statues = paymentStatusObj;;
  public selectedAll: boolean = false;
  public selection: GetPaymentsResponse[] = [];
  public commentary: string = '';
  private paymentResponseStateSubscribtion!: Subscription;
  public rowStatusesColors = rowStatusesColors;
  

  public cols = [
    {field: 'paymentID', header: 'ID PE'},
    {field: 'applicationID', header: 'ID заявки'},
    {field: 'plannedDate', header: 'Дата исполнения платежа'},
    {field: 'amount', header: 'Сумма'},
    {field: 'type', header: 'Тип перевода'},
    {field: 'statusCodePE', header: 'Код статуса'},    
    {field: 'statusPE', header: 'Статус PE'},
    {field: 'paymentHubPaymentId', header: 'ID PH'},
    {field: 'channelIP', header: 'IP адрес'},
    {field: 'pmtCreationTime', header: 'Дата заявки в PE'},
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

  }

  onHeaderCheckboxToggle(e: any) {
    
  }

  back() {
    this.peNavigationService.goBack();
  }

  cancelPayments() {
    this.dialogService.showConfirmDialog({
      message: 'Вы действительно хотите отменить платеж/перевод?',
      header: 'Подтверждение',
      accept: {
        label: 'Да',
        handler: () => {
          const $paymentsToCancel = this.selection.map(selection => (this.paymentOrderW.cancelPayment({ 
            cancelReason: CancelReason.BANK_OPS,
            paymentID: selection.paymentID ?? "",
            channelName: "PEW",
            chennelUser: this.authService.user?.connectionName ?? "Unknown_User",
            description: this.commentary ?? undefined
          })));
          if (!$paymentsToCancel?.length){
            this.toasterService.showWarnToast("Необходимо выбрать хотя бы один платеж/перевод на отмену");
            return;
          }
          this.loadingService.attach(forkJoin($paymentsToCancel)).then((response) => {
            if (response){
              (<Array<Object>>response).some(element => !!element.hasOwnProperty("attr_errors"))
                ? this.toasterService.showWarnToast("Ошибка одного или более платежа/перевода на отмену")
                : this.toasterService.showSuccessToast("Запрос на отмену платежа/перевода отправлен успешно");
            }
          })
          .catch(() => {
            this.toasterService.showErrorToast("Ошибка сервера");
          });
        },
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
        handler: () => {
          const $paymentsToResume = this.selection.map(selection => (this.paymentOrderW.resumePayment({ 
            paymentID: selection.paymentID ?? "",
            channelUser: this.authService.user?.connectionName ?? "Unknown_User",
            ResumeComment: this.commentary ?? undefined
          })));
          if (!$paymentsToResume?.length){
            this.toasterService.showWarnToast("Необходимо выбрать хотя бы один платеж/перевод на возобновление");
            return;
          }
          this.loadingService.attach(forkJoin($paymentsToResume)).then((response) => {
            if (response){
              (<Array<Object>>response).some(element => !!element.hasOwnProperty("attr_errors"))
                ? this.toasterService.showWarnToast("Ошибка одного или более платежа/перевода на возобновление")
                : this.toasterService.showSuccessToast("Запрос на возобновление платежа/перевода отправлен успешно");
            }
            
          })
          .catch(() => {
            this.toasterService.showErrorToast("Ошибка сервера");
          });
      },
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
    this.peNavigationService.goToViewTransferDetails(id);
  }


  tableCheckboxDisabled(paymentItem: GetPaymentsResponse) {
    return paymentItem.rowStatus === 'successful'
  }

  onSelectionChange(selection: any) {
    for (let i = selection.length - 1; i >= 1; i--) {
      let data = selection[i];
      if (this.tableCheckboxDisabled(data)) {
        selection.splice(i, 1);
      }
    }
    this.selection = selection;
  }

  prepareTypes(entries: any[]): any {
    let obj: any = {};
    entries.forEach(entry => {
      obj[entry[0]] = entry[1];
    });
    return obj;
  }

}
