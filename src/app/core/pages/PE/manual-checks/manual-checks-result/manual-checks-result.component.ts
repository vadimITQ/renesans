import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { PaymentTypes } from 'src/app/shared/enums/manual-checks.enums';
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
import { CancelReason, ICancelPaymentPayload, ICancelPaymentResponse, IResumePaymentPayload, IResumePaymentResponse } from 'src/app/core/services/payment-order-w/types';
import { ISearchPaymentsResponse } from 'src/app/core/services/search-payment/types';
import { paymentStatusObj } from 'src/app/shared/variables/payment-status';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ObjectHelper } from 'src/app/shared/classes/object-helper';

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
    {field: 'paymentApplication.applicationID', header: 'ID PE'},
    {field: 'plannedDate', header: 'ID заявки'},
    {field: 'paymentApplication.amount', header: 'Дата исполнения платежа'},
    {field: 'type', header: 'Сумма'},
    {field: 'statusCode', header: 'Тип перевода'},
    {field: 'statusCodePE', header: 'Статус PE'},
    {field: 'paymentApplication.statusPE', header: 'Код статуса'},
    {field: 'ipt.idPH', header: 'ID PH'},
    {field: 'aymentApplication.channelIP', header: 'IP адрес'},
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
          const paymentIds: string[] = this.selection.map(selection => selection.paymentID  ?? "");
          const $paymentsToCancel = this.selection.map(selection => (this.paymentOrderW.cancelPayment(ObjectHelper.deleteUndefinedProperties({
            cancelReason: CancelReason.CLIENT,
            paymentID: selection.paymentID ?? "",
            description: this.commentary ?? "",
            channelName: 'PEW',
            chennelUser: this.authService.user?.connectionName ?? "Unknown_User"
          } as ICancelPaymentPayload))));
          if (!$paymentsToCancel?.length){
            this.toasterService.showWarnToast("Необходимо выбрать хотя бы один платеж/перевод на отмену");
            return;
          }
          this.loadingService.attach(forkJoin($paymentsToCancel)).then((response) => {
            console.log(response);
            this.validateResponsesFromCancePayment(response, paymentIds);
          })
          .catch((e) => {
            console.log(e);
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
      message: 'Вы действительно хотите возобновить обработку по платежу/переводу?',
      header: 'Подтверждение',
      accept: {
        label: 'Да',
        handler: () => {
          const paymentIds: string[] = this.selection.map(selection => selection.paymentID  ?? "");
          const $paymentsToResume = this.selection.map(selection => (this.paymentOrderW.resumePayment(ObjectHelper.deleteUndefinedProperties({ 
            paymentID: selection.paymentID ?? "",
            channelUser: this.authService.user?.connectionName ?? "Unknown_User",
            ResumeComment: this.commentary ?? "",
            АpplicationChannelName: "PEW"
          } as IResumePaymentPayload))));
          if (!$paymentsToResume?.length){
            this.toasterService.showWarnToast("Необходимо выбрать хотя бы один платеж/перевод на возобновление");
            return;
          }
          this.loadingService.attach(forkJoin($paymentsToResume)).then((response) => {
            console.log(response);
            this.validateResponsesFromResumePayment(response, paymentIds);
          })
          .catch((e) => {
            console.log(e);
            this.toasterService.showErrorToast("Ошибка сервера");
          });
      },
      },
      reject: {
        label: 'Нет',
      },
    });
  }

  validateResponsesFromCancePayment(responses: ICancelPaymentResponse[], paymentIds: string[]){
    if (responses){
      responses.forEach((response, idx) => {
        const errorMessage = response?.errorMessage ?? "";
        const attrErrors = response?.attrErrors ?? [];
        const paymentId = paymentIds[idx] ?? "";
        if (errorMessage){
          this.toasterService.showWarnToast(`Ошибка отмены. ${errorMessage}`, `Платёж/перевод № ${paymentId}`);
        }
        else{
          this.toasterService.showSuccessToast("Запрос на отмену платежа/перевода отправлен успешно", `Платёж/перевод № ${paymentId}`)
        }
      });
    }
  }

  validateResponsesFromResumePayment(responses: IResumePaymentResponse[], paymentIds: string[]){
    if (responses){
      responses.forEach((response, idx) => {
        const errorMessage = response.errorMessage ?? "";
        const paymentId = paymentIds[idx] ?? "";
        if (errorMessage){
          this.toasterService.showWarnToast(`Ошибка возобновления. ${errorMessage}`, `Платёж/перевод № ${paymentId}`);
        }
        else{
          this.toasterService.showSuccessToast("Запрос на возобновление платежа/перевода отправлен успешно", `Платёж/перевод № ${paymentId}`)
        }
      });
    }
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
