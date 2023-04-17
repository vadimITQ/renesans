import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ISearchPayment, ISearchPaymentsFiltersPayload } from './types';
import { ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { Pagination, TableService } from '../../../shared/services/table.service';
import { prepareSearchFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService extends TableService<ISearchPayment, ISearchPaymentsFiltersPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
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

  public $filters: BehaviorSubject<ISearchPaymentFilters | null> = new BehaviorSubject<ISearchPaymentFilters | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getPaymentsReport(): Observable<ArrayBuffer | null> {
    if (!this.$filters.value) {
      return of(null);
    }
    this.$reportLoading.next(true);
    return this.paymentOrderWService.getPaymentsReport(prepareSearchFilters(this.$filters.value)).pipe(
      tap(() => {
        this.$reportLoading.next(false);
      }),
    );
  }
}
