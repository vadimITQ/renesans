import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../../shared/variables/http-constants';
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
