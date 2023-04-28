import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManualChecksService } from 'src/app/core/services/manual-checks/manual-checks.service';
import { PaymentTypes } from 'src/app/shared/enums/manual-checks.enums';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { commentaryExpr, commentaryLength } from 'src/app/shared/variables/pe-input-validations';
import { PaymentOrderWService } from '../../../../services/payment-order-w/payment-order-w.service';
import { forkJoin, skip, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import {
  CancelReason,
  ICancelPaymentPayload,
  ICancelPaymentResponse,
  IResumePaymentPayload,
  IResumePaymentResponse,
} from 'src/app/core/services/payment-order-w/types';
import { paymentStatusObj } from 'src/app/shared/variables/payment-status';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ObjectHelper } from 'src/app/shared/classes/object-helper';
import { failStatusList, successStatusList } from './manual-checks-result.constants';
import {SearchPaymentWithManualParse} from "./manual-checks-result.types";

@Component({
  selector: 'app-manual-checks-result',
  templateUrl: './manual-checks-result.component.html',
  styleUrls: ['./manual-checks-result.component.scss'],
})
export class ManualChecksResultComponent implements OnInit, OnDestroy {
  constructor(
    public mcService: ManualChecksService,
    private paymentOrderW: PaymentOrderWService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private toasterService: ToastService,
    private peNavigationService: PeNavigationService,
    private authService: AuthService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public readonly COMMENTARY_EXPR = commentaryExpr;
  public readonly COMMENTARY_LENGTH = commentaryLength;
  public paymentResponse: SearchPaymentWithManualParse[] | null | undefined = undefined;
  public types = this.prepareTypes(Object.entries(PaymentTypes));
  public statues = paymentStatusObj;
  public selectedAll: boolean = false;
  public selection: GetPaymentsResponse[] = [];
  public commentary: string = '';
  private paymentResponseStateSubscribtion!: Subscription;

  get selectedItems(): GetPaymentsResponse[] {
    return this.mcService.componentState.$selectedItems.value ?? [];
  }

  set selectedItems(selectedItems: GetPaymentsResponse[]) {
    this.selection = selectedItems;
    this.mcService.componentState.$selectedItems.next(selectedItems);
  }

  public cols = [
    { field: 'paymentApplication.applicationID', header: 'ID PE' },
    { field: 'plannedDate', header: 'ID заявки' },
    { field: 'ipt.idPH', header: 'ID PH' },
    { field: 'pmtCreationTime', header: 'Дата заявки в PE' },
    { field: 'paymentApplication.amount', header: 'Дата исполнения платежа' },
    { field: 'type', header: 'Сумма' },
    { field: 'statusCode', header: 'Тип перевода' },
    { field: 'statusCodePE', header: 'Статус PE' },
    { field: 'paymentApplication.statusPE', header: 'Код статуса' },
    { field: 'aymentApplication.channelIP', header: 'IP адрес' },
    { field: 'errorType', header: 'Тип ошибки' },
  ];

  @ViewChild('manualChecksTable') manualChecksTable!: Table;

  ngOnInit(): void {
    this.initComponentState();
    this.paymentResponseStateSubscribtion = this.mcService.$tableData.pipe(skip(1)).subscribe(paymentData => {
      this.selectedItems = [];
      this.commentary = '';
      this.paymentResponse = paymentData;
    });
    this.changeDetector.detectChanges();
  }

  initComponentState() {
    this.selection = this.mcService.componentState.$selectedItems.value ?? [];
    this.commentary = this.mcService.componentState.commentary ?? '';
    this.paymentResponse = this.mcService.$tableData.value;
  }

  ngOnDestroy(): void {
    this.mcService.componentState.$selectedItems.next(this.selection);
    this.mcService.componentState.commentary = this.commentary;
    if (this.paymentResponseStateSubscribtion) {
      this.paymentResponseStateSubscribtion.unsubscribe();
    }
  }

  onRowSelected(e: any) {}

  onHeaderCheckboxToggle(e: any) {}

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
          const paymentIds: string[] = this.selection.map(selection => selection.paymentID ?? '');
          const $paymentsToCancel = this.selection.map(selection =>
            this.paymentOrderW.cancelPayment(
              ObjectHelper.deleteUndefinedProperties({
                cancelReason: CancelReason.CLIENT,
                paymentID: selection.paymentID ?? '',
                description: this.commentary ?? '',
                channelName: 'PEW',
                chennelUser: this.authService.user?.connectionName ?? 'Unknown_User',
              } as ICancelPaymentPayload),
            ),
          );
          if (!$paymentsToCancel?.length) {
            this.toasterService.showWarnToast('Необходимо выбрать хотя бы один платеж/перевод на отмену');
            return;
          }
          this.loadingService
            .attach(forkJoin($paymentsToCancel))
            .then(response => {
              console.log(response);
              this.validateResponsesFromCancelPayment(response, paymentIds);
            })
            .catch(e => {
              console.log(e);
              this.toasterService.showErrorToast('Ошибка сервера');
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
          const paymentIds: string[] = this.selection.map(selection => selection.paymentID ?? '');
          const $paymentsToResume = this.selection.map(selection =>
            this.paymentOrderW.resumePayment(
              ObjectHelper.deleteUndefinedProperties({
                paymentID: selection.paymentID ?? '',
                channelUser: this.authService.user?.connectionName ?? 'Unknown_User',
                ResumeComment: this.commentary ?? '',
                АpplicationChannelName: 'PEW',
              } as IResumePaymentPayload),
            ),
          );
          if (!$paymentsToResume?.length) {
            this.toasterService.showWarnToast('Необходимо выбрать хотя бы один платеж/перевод на возобновление');
            return;
          }
          this.loadingService
            .attach(forkJoin($paymentsToResume))
            .then(response => {
              console.log(response);
              this.validateResponsesFromResumePayment(response, paymentIds);
            })
            .catch(e => {
              console.log(e);
              this.toasterService.showErrorToast('Ошибка сервера');
            });
        },
      },
      reject: {
        label: 'Нет',
      },
    });
  }

  validateResponsesFromCancelPayment(responses: ICancelPaymentResponse[], paymentIds: string[]) {
    if (responses) {
      responses.forEach((response, idx) => {
        const errorMessage = response?.errorMessage ?? '';
        const paymentId = paymentIds[idx] ?? '';
        if (errorMessage) {
          this.toasterService.showWarnToast(`Ошибка отклонения. ${errorMessage}`, `Платёж/перевод № ${paymentId}`);
        } else {
          this.toasterService.showSuccessToast('Запрос на отклонение платежа/перевода отправлен успешно', `Платёж/перевод № ${paymentId}`);
        }
      });
    }
  }

  validateResponsesFromResumePayment(responses: IResumePaymentResponse[], paymentIds: string[]) {
    if (responses) {
      responses.forEach((response, idx) => {
        const errorMessage = response.errorMessage ?? '';
        const paymentId = paymentIds[idx] ?? '';
        if (errorMessage) {
          this.toasterService.showWarnToast(`Ошибка возобновления. ${errorMessage}`, `Платёж/перевод № ${paymentId}`);
        } else {
          this.toasterService.showSuccessToast(
            'Запрос на возобновление платежа/перевода отправлен успешно',
            `Платёж/перевод № ${paymentId}`,
          );
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

  tableRowStatusColor(paymentItem: SearchPaymentWithManualParse): string {
    if(paymentItem.manualParse === 1 || !paymentItem.manualParse) {
      return ''
    }
    if (successStatusList.includes(paymentItem.statusCode)) {
      return '#FFCC00';
    }
    if (failStatusList.includes(paymentItem.statusCode)) {
      return 'red';
    }
    return '';
  }

  onSelectionChange(selection: any) {
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
