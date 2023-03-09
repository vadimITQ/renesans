import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, of, tap } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { manualChecksTableData } from 'src/app/shared/mocks/manual-checks-table.mock';
import { ISearchPayment } from '../../pages/PE/search-payment/search-payment.types';
import { searchPaymentMock } from '../../pages/PE/search-payment/search-payment.mock';
import { BASE_URL } from '../../../shared/variables/http-constants';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderWService {
  constructor(private http: HttpClient) {}

  public cancelPayment(): Observable<any> {
    return of(null).pipe(delay(2000));
  }

  public resumePayment(): Observable<any> {
    return of(null).pipe(delay(2000));
  }

  public getPayments(form: 'SearchPayment' | 'ManualChecks'): Observable<GetPaymentsResponse[] | ISearchPayment[]> {
    const mockData = form === 'SearchPayment' ? searchPaymentMock : form === 'ManualChecks' ? manualChecksTableData : null;
    if (mockData) {
      return of(mockData).pipe(delay(2000));
    } else {
      return of([]);
    }
  }

  public getTransferDetails(paymentID: string): Observable<any> {
    return this.http.post(BASE_URL + '/searchPaymentDetails', null, {
      params: { paymentID },
    });
  }
}
