import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ITransferDetails } from './types';

@Injectable({
  providedIn: 'root',
})
export class ViewTransferDetailsService {
  constructor(private paymentOrderWService: PaymentOrderWService) {}

  public $transferDetailsState: BehaviorSubject<ITransferDetails | null> = new BehaviorSubject<ITransferDetails | null>(null);

  public getTransferDetails(id: string) {
    this.$transferDetailsState.next(null);
    return this.paymentOrderWService.getTransferDetails(id).pipe(
      tap(response => {
        console.log(response);
        // if (this.instanceOfSearchPayment(response)) {
        this.$transferDetailsState.next(response);
        // }
      }),
    );
  }
}
