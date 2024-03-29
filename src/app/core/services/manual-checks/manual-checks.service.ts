import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ICancelPaymentPayload, IResumePaymentPayload } from '../payment-order-w/types';
import { ISearchPaymentsFiltersPayload } from '../search-payment/types';
import { ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { Pagination, TableService } from '../../../shared/services/table.service';
import { SearchPaymentWithManualParse } from '../../pages/PE/manual-checks/manual-checks-result/manual-checks-result.types';

interface ManualChecksComponentState {
  $filters: BehaviorSubject<ISearchPaymentFilters | null>;
  $selectedItems: BehaviorSubject<GetPaymentsResponse[] | null>;
  commentary: string;
}

@Injectable({
  providedIn: 'root',
})
export class ManualChecksService extends TableService<SearchPaymentWithManualParse, ISearchPaymentsFiltersPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getSearchPaymentsManual(payload: ISearchPaymentsFiltersPayload, pagination: Pagination) {
      return paymentOrderWService.getSearchPaymentsManual(payload, pagination).pipe(
        //todo: update me
        map(value => ({
          ...value,
          data: value.payments.map(({ payment, manualParse }) => ({
            ...payment,
            manualParse,
          })),
        })),
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
    super(getSearchPaymentsManual);
  }

  public componentState: ManualChecksComponentState = {
    $filters: new BehaviorSubject<ISearchPaymentFilters | null>(null),
    $selectedItems: new BehaviorSubject<GetPaymentsResponse[] | null>(null),
    commentary: '',
  };

  public cancelPayment(payload: ICancelPaymentPayload) {
    this.paymentOrderWService.cancelPayment(payload);
  }

  public resumePayment(payload: IResumePaymentPayload) {
    this.paymentOrderWService.resumePayment(payload);
  }
}
