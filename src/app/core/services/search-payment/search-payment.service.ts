import { Injectable } from '@angular/core';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private paymentOrderWService: PaymentOrderWService) {}


  public getPayments() {
    return this.paymentOrderWService.getPayments();
  }

}
