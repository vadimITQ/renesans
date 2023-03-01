
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { manualChecksTableData } from 'src/app/shared/mocks/manual-checks-table.mock';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderWService {

  constructor(private http: HttpClient) { }

  public cancelPayment(): Observable<any> {
    return of(null).pipe(delay(2000));
  }

  public resumePayment(): Observable<any> {
    return of(null).pipe(delay(2000));
  }

  public getPayments(): Observable<GetPaymentsResponse[]> {
    return of(manualChecksTableData);
  }

}