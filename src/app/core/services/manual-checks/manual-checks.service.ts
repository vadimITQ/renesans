import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { validateFilter } from '../../pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.validation';
import { ICancelPaymentPayload, IResumePaymentPayload } from '../payment-order-w/types';
import { prepareSearchFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';
import {IPayment, ISearchPayment,} from '../search-payment/types';
import { ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';

interface ManualChecksComponentState {
  $filters: BehaviorSubject<ISearchPaymentFilters | null>,
  $selectedItems: BehaviorSubject<GetPaymentsResponse[] | null>,
  commentary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private toastService: ToastService
  ) { }

  public $paymentResponseState: BehaviorSubject<ISearchPayment[] | null | undefined> = new BehaviorSubject<ISearchPayment[] | null | undefined>(undefined);
  public componentState: ManualChecksComponentState = {
    $filters: new BehaviorSubject<ISearchPaymentFilters | null>(null),
    $selectedItems: new BehaviorSubject<GetPaymentsResponse[] | null>(null),
    commentary: ""
  };

  public getPayments(filter: ISearchPaymentFilters): Observable<any> {
    this.$paymentResponseState.next(null);
    return this.paymentOrderWService.getSearchPaymentsManual(prepareSearchFilters(filter)).pipe(
      tap(response => {
        // const sortedData = sortPaymentData(setRowStatuses(response));
        if (!response?.payments.length){
          this.toastService.showWarnToast("Ничего не найдено, проверьте параметры запроса и интервалы дат", "Сообщение");
          this.$paymentResponseState.next(undefined);
          return;
        }
        this.$paymentResponseState.next(response.payments.map(({payment})=>payment));
    }),
    catchError((error) => {
      if (error.status !== 401){
        this.toastService.showErrorToast("Внутренняя ошибка сервиса. Возникла ошибка при получении информации об ошибочных переводах/платежах");
      }
      this.$paymentResponseState.next(undefined);
      return of(error);
    }),
    delay(2000));
  }

  public cancelPayment(payload: ICancelPaymentPayload){
    this.paymentOrderWService.cancelPayment(payload);
  }

  public resumePayment(payload: IResumePaymentPayload){
    this.paymentOrderWService.resumePayment(payload);
  }


}
