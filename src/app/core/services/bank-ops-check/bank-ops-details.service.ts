import { Injectable } from '@angular/core';
import { bankOpsDetailsMockData } from '../../pages/PE/bank-ops-details/bank-ops-details.mock';
import { Observable, delay, of } from 'rxjs';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { IGetManualCheckModeResponse } from '../payment-order-w/types';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BankOpsDetailsService {

  constructor(
    private paymentOrderW: PaymentOrderWService,
    private authService: AuthService
  ){}

  getBankOpsDetails() {
    return of(bankOpsDetailsMockData).pipe(delay(500));
  }

  getManualCheckMode(paymentID: string): Observable<IGetManualCheckModeResponse> {
    return this.paymentOrderW.getManualCheckMode({
      paymentID: paymentID,
      checkType: 'BANK_OPS',
      userLogin: this.authService.user?.connectionName ?? 'Unknown_User'
    });
  }

  saveManualCheckMode(paymentID: string, status: string) {
    return this.paymentOrderW.saveManualCheckMode({
      paymentID: paymentID,
      manualCheck: {
        checkType: "BANK_OPS",
        status: status
      }
    });
  }

}
