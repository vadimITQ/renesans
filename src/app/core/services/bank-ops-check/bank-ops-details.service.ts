import { Injectable } from '@angular/core';
import { bankOpsDetailsMockData } from '../../pages/PE/bank-ops-details/bank-ops-details.mock';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankOpsDetailsService {
  getBankOpsDetails() {
    return of(bankOpsDetailsMockData).pipe(delay(500));
  }
}
