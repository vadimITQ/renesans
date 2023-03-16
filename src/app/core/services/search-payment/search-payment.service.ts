import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ISearchPaymentsPayload, ISearchPaymentsResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private paymentOrderWService: PaymentOrderWService) {}

  public $paymentResponseState: BehaviorSubject<ISearchPaymentsResponse[] | null> = new BehaviorSubject<ISearchPaymentsResponse[] | null>(
    null,
  );
  public $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getSearchPayments(payload: ISearchPaymentsPayload) {
    this.$paymentResponseState.next(null);
    this.$loading.next(true)
    return this.paymentOrderWService.getSearchPayments(payload).pipe(
      tap(response => {
        this.$paymentResponseState.next(response);
        this.$loading.next(false)
      }),
    );
  }
}
