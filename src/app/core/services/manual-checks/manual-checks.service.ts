import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { manualChecksTableData } from '../../../shared/mocks/manual-checks-table.mock';
import { GetPaymentsResponse, ManualChecksFilter } from '../../../shared/models/manual-checks-models';

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor() { }

  public $paymentResponseState: BehaviorSubject<GetPaymentsResponse[] | null | undefined> = new BehaviorSubject<GetPaymentsResponse[] | null | undefined>(undefined);

  getPayments(filters: ManualChecksFilter): Observable<GetPaymentsResponse[]>{
    this.$paymentResponseState.next(null);
    return of(manualChecksTableData).pipe(
      delay(2000), tap(response => {
      this.$paymentResponseState.next(response);
    }));
  }
  
}
