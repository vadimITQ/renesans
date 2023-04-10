import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, Observable, of, tap } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { manualChecksTableData } from 'src/app/shared/mocks/manual-checks-table.mock';
import { ISearchPaymentTableData } from '../../pages/PE/search-payment/search-payment.types';
import { API_URL } from '../../../shared/variables/http-constants';
import { ITransferDetails } from '../view-transfer-details/types';
import { ISearchPaymentsPayload, ISearchPaymentsResponse } from '../search-payment/types';
import { ICancelPaymentPayload, ICancelPaymentResponse, IResumePaymentPayload, IResumePaymentResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderWService {
  constructor(private http: HttpClient) {}

  public cancelPayment(cancelPaymentPayload: ICancelPaymentPayload): Observable<ICancelPaymentResponse> {
    return this.http.post<ICancelPaymentResponse>(API_URL + '/cancelPayment', cancelPaymentPayload);
  }

  public resumePayment(resumePaymentBody: IResumePaymentPayload): Observable<any> {
    return this.http.post<IResumePaymentResponse>(API_URL + '/resumePayment', {}, { params: { ...resumePaymentBody } });
  }

  public getPayments(form: 'ManualChecks'): Observable<GetPaymentsResponse[] | ISearchPaymentTableData[]> {
    const mockData = manualChecksTableData;
    if (mockData) {
      // return this.http.get(API_URL + '/searchPayments'); //of(mockData).pipe(delay(2000));
      return of(mockData).pipe(delay(2000));
    } else {
      return of([]);
    }
  }

  public getSearchPayments(data: ISearchPaymentsPayload): Observable<ISearchPaymentsResponse> {
    return this.http.post<ISearchPaymentsResponse>(API_URL + '/searchPayments', data);
  }

  public getSearchPaymentsManual(data: ISearchPaymentsPayload): Observable<ISearchPaymentsResponse> {
    return this.http.post<ISearchPaymentsResponse>(API_URL + '/searchPayments', data, { params: { isManualParse: true } });
  }

  public getTransferDetails(paymentID: string): Observable<ITransferDetails> {
    return this.http.get<ITransferDetails>(API_URL + '/searchPaymentDetails', {
      params: { paymentID },
    });
  }
}
