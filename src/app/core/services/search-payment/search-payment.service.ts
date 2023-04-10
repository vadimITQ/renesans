import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import {ISearchPayment, ISearchPaymentsPayload} from './types';
import { ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {}

  public $paymentResponseState: BehaviorSubject<ISearchPayment[] | null> = new BehaviorSubject<ISearchPayment[] | null>(
    null,
  );
  public $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $filters: BehaviorSubject<ISearchPaymentFilters | null> = new BehaviorSubject<ISearchPaymentFilters | null>(null);

  public getSearchPayments(payload: ISearchPaymentsPayload) {
    this.$paymentResponseState.next(null);
    this.$loading.next(true)
    return this.paymentOrderWService.getSearchPayments(payload).pipe(
      tap(response => {
        if(response && !response.payments.length) {
          this.toastService.showWarnToast('Ничего не найдено, проверьте параметры запроса и интервалы дат', "Сообщение")
        }
        this.$paymentResponseState.next(response.payments.map(({payment})=> payment));
        this.$loading.next(false)
      })
    );
  }
}
