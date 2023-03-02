import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private http: HttpClient) {}

  getPayments() {
    const response = this.http.get('/payments');
    console.log(response);
  }
}
