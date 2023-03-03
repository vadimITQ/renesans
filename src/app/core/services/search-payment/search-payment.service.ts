import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../../shared/variables/http-constants';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private http: HttpClient) {}

  getPayments() {
    console.log('bang');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('x-ibm-client-id', '75819d26-bd68-46bb-b9c9-4ce8ca4e4e83');
    headers = headers.append('x-ibm-client-secret', 'uA2yL2hE3qI8oP0sG4xY2hO4wG3iX3lR5pA8nA6mU4kC3bD8hF');

    const response = this.http.get(BASE_URL + '/searchPayments', { headers, observe: 'response' });
    response.subscribe(value => console.log(value));
  }
}
