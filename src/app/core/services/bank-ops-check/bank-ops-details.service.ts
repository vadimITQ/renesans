import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { IGetManualCheckModeResponse } from '../payment-order-w/types';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BankOpsDetailsService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private authService: AuthService
  ){}

  public getBankOpsDetails(id: string) {
    return this.paymentOrderWService.getApplicationDetails(id);
  }

  getManualCheckMode(paymentID: string): Observable<IGetManualCheckModeResponse> {
    return this.paymentOrderWService.getManualCheckMode({
      paymentID: paymentID,
      checkType: 'BANK_OPS',
      userLogin: this.authService.user?.connectionName ?? 'Unknown_User'
    });
  }

  saveManualCheckMode(paymentID: string, status: string) {
    return this.paymentOrderWService.saveManualCheckMode({
      paymentID: paymentID,
      manualCheck: {
        checkType: "BANK_OPS",
        status: status
      }
    });
  }
}
