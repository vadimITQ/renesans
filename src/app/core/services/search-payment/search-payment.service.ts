import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { IGetSearchPaymentsReportPayload, ISearchPayment, ISearchPaymentsFiltersPayload } from './types';
import { ISearchPaymentFilterForm, ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { Pagination, TableService } from '../../../shared/services/table.service';
import { SearchPaymentsFilterUtils } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';
import { FormGroup } from '@angular/forms';
import { ISearchPaymentTableData } from '../../pages/PE/search-payment/search-payment.types';
import { CancelReason, ICancelPaymentResponse } from '../payment-order-w/types';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService extends TableService<ISearchPayment, ISearchPaymentsFiltersPayload> {
  constructor(
    private paymentOrderWService: PaymentOrderWService, 
    private toastService: ToastService,
    private searchPaymentUtils: SearchPaymentsFilterUtils,
    private authService: AuthService
  ) {
    function getSearchPayments(payload: ISearchPaymentsFiltersPayload, pagination: Pagination) {
      return paymentOrderWService.getSearchPayments(payload, pagination).pipe(
        //todo: update me
        map(value => ({ ...value, data: value.payments.map(({ payment }) => payment) })),
        catchError(error => {
          if (error.status !== 401) {
            toastService.showErrorToast(
              'Внутренняя ошибка сервиса. Возникла ошибка при получении информации об ошибочных переводах/платежах',
            );
          }
          return of(error);
        }),
      );
    }
    super(getSearchPayments);
  }

  public $filter: BehaviorSubject<FormGroup<ISearchPaymentFilterForm>> = new BehaviorSubject<FormGroup<ISearchPaymentFilterForm>>(this.searchPaymentUtils.createDefaultFilterFormGroup());
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getPaymentsReport(prms: IGetSearchPaymentsReportPayload): Observable<ArrayBuffer | null> {
    if (!this.$filter.value) {
      return of(null);
    }
    this.$reportLoading.next(true);
    return this.paymentOrderWService.getPaymentsReport(prms).pipe(
      tap(() => {
        this.$reportLoading.next(false);
      }),
    );
  }

  cancelPayments(payments: ISearchPaymentTableData[]): Observable<ICancelPaymentResponse[]> {
    const $paymentStreams = payments.map(payment => {
      return this.paymentOrderWService.cancelPayment({
        cancelReason: CancelReason.CLIENT,
        paymentID: payment.paymentID ?? '',
        description: '',
        channelName: 'PEW',
        channelUser: this.authService.user?.connectionName ?? 'Unknown_User',
      });
    });
    return forkJoin($paymentStreams);
  }
}
