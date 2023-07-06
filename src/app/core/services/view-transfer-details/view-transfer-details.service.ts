import { Injectable } from '@angular/core';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';

@Injectable({
  providedIn: 'root',
})
export class ViewTransferDetailsService {
  constructor(private paymentOrderWService: PaymentOrderWService) {}


  public getTransferDetails(id: string) {
    return this.paymentOrderWService.getTransferDetails(id)
  }
}
