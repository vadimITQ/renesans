import { Component, OnDestroy, OnInit } from '@angular/core';
import { searchPaymentTableColumns } from './search-payment-table.constants';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-helper';
import { SearchPaymentService } from 'src/app/core/services/search-payment/search-payment.service';
import { Subscription } from 'rxjs';
import { ISearchPaymentTableData } from '../search-payment.types';
import { prepareSearchPaymentsData } from './search-payment-table.utils';
import { ToastService } from '../../../../../shared/services/toast.service';
import { DatePipe } from '@angular/common';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { ISearchPayment } from 'src/app/core/services/search-payment/types';
import { PeRolesService } from '../../../../services/auth/pe-roles.service';
import { IColumn } from '../../../../../shared/types/table.types';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SearchPaymentsFilterUtils } from '../search-payment-filters/search-payment-filters.utils';

@Component({
  selector: 'app-search-payment-table',
  templateUrl: './search-payment-table.component.html',
  styleUrls: ['./search-payment-table.component.scss'],
})
export class SearchPaymentTableComponent implements OnInit, OnDestroy {
  constructor(
    public searchPaymentService: SearchPaymentService,
    private toastService: ToastService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private datePipe: DatePipe,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService,
    private utils: SearchPaymentsFilterUtils
  ) {}

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscription) {
      this.paymentResponseStateSubscription.unsubscribe();
    }
  }

  public tableColumns: IColumn[] = searchPaymentTableColumns;
  public tableData: ISearchPaymentTableData[] | null = null;
  public paymentResponse: ISearchPayment[] | null = [];
  public selectedPayments: ISearchPaymentTableData[] = [];
  private paymentResponseStateSubscription!: Subscription;

  generateReport() {
    if (!!this.searchPaymentService.$filter.value) {
      this.searchPaymentService.getPaymentsReport({
        isSBPReport: false,
        isManualParse: false,
        searchPayments: this.utils.prepareSearchFilters(this.searchPaymentService.$filter.value)
      })
      .subscribe(value =>
        value
          ? XlsxHelper.saveAsExcelFile(value, `Отчет по платежам_${this.datePipe.transform(new Date(), 'ddMMYYYY')}`)
          : this.toastService.showErrorToast('Не удалось сформировать отчёт. Попробуйте еще раз'),
      );
    }
  }

  paymentIdClick(id: string) {
    this.peNavigationService.goToViewTransferDetails(id);
  }

  generateSbpReport() {
    if (!!this.searchPaymentService.$filter.value) {
      this.searchPaymentService.getPaymentsReport({
        isSBPReport: true,
        isManualParse: false,
        searchPayments: this.utils.prepareSearchFilters(this.searchPaymentService.$filter.value)
      }).subscribe(buffer => {
        if (!!buffer) {
          XlsxHelper.saveAsExcelFile(
            buffer,
            `Отчет по СБП платежам_${ this.datePipe.transform(new Date(), "ddMMyyyy") }.xlsx`
          );
        }
        else {
          this.toastService.showErrorToast('Не удалось сформировать отчёт. Попробуйте еще раз');
        }
      });
    }
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
      this.selectedPayments = [];
      this.paymentResponse = paymentResponse;
      this.tableData = paymentResponse ? prepareSearchPaymentsData(paymentResponse, this.datePipe) : null;
    });
  }

  cancelPayments() {
    if (this.selectedPayments.length > 0) {
      this.dialogService.showConfirmDialog({
        message: 'Вы действительно хотите отменить платеж/перевод?',
        header: 'Подтверждение',
        accept: {
          label: 'Да',
          handler: () => {
            this.loadingService
              .attach(this.searchPaymentService.cancelPayments(this.selectedPayments))
              .then(cancelResponses => {
                cancelResponses.forEach((cancelResponse, idx) => {
                  const hasError = !!cancelResponse?.errorMessage;
                  const paymentID = this.selectedPayments[idx].paymentID ?? '';
                  if (hasError) {
                    this.toastService.showWarnToast(`Ошибка отклонения. ${cancelResponse.errorMessage}`, `Платёж/перевод № ${paymentID}`);
                  } else {
                    this.toastService.showSuccessToast(
                      'Запрос на отклонение платежа/перевода отправлен успешно',
                      `Платёж/перевод № ${paymentID}`,
                    );
                  }
                });
              })
              .catch(() => {
                this.toastService.showErrorToast('Внутренняя ошибка сервиса.');
              });
          },
        },
        reject: {
          label: 'Нет',
          handler: () => {},
        },
      });
    } else {
      this.toastService.showWarnToast('Выберите хотя бы один платеж/перевод на отмену');
    }
  }
}
