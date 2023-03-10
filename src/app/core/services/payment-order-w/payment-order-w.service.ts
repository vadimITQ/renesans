import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, of, tap } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { manualChecksTableData } from 'src/app/shared/mocks/manual-checks-table.mock';
import { ISearchPayment } from '../../pages/PE/search-payment/search-payment.types';
import { searchPaymentMock } from '../../pages/PE/search-payment/search-payment.mock';
import { BASE_URL } from '../../../shared/variables/http-constants';
import { ITransferDetails } from '../view-transfer-details/types';
import { ISearchPaymentsPayload } from '../search-payment/types';

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
      // return this.http.get(BASE_URL + '/searchPayments'); //of(mockData).pipe(delay(2000));
      return of(mockData);
    } else {
      return of([]);
    }
  }

  public getSearchPayments(data: ISearchPaymentsPayload): Observable<any> {
    return this.http.post(BASE_URL + '/searchPayments', data);
  }

  public getTransferDetails(paymentID: string): Observable<ITransferDetails> {
    return this.http.get<ITransferDetails>(BASE_URL + '/searchPaymentDetails', {
      params: { paymentID },
    });
  }
}
