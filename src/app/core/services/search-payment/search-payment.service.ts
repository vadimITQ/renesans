import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { ISearchPayment } from '../../pages/PE/search-payment/search-payment.types';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ISearchPaymentsPayload } from './types';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private paymentOrderWService: PaymentOrderWService) {}

  public $paymentResponseState: BehaviorSubject<ISearchPayment[] | null | undefined> = new BehaviorSubject<
    ISearchPayment[] | null | undefined
  >(undefined);

  public getPayments(payload: ISearchPaymentsPayload) {
    this.$paymentResponseState.next(null);
    return this.paymentOrderWService.getSearchPayments(payload).pipe(
      tap(response => {
        console.log(response);
        if (this.instanceOfSearchPayment(response)) {
          this.$paymentResponseState.next(response);
        }
      }),
    );
  }

  private instanceOfSearchPayment(object: any): object is ISearchPayment[] {
    return !!object && 'appCreationTime' in object[0];
  }
}
