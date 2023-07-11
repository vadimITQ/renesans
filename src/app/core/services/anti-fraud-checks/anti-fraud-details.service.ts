import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { AuthService } from '../auth/auth.service';
import { IGetManualCheckModeResponse } from '../payment-order-w/types';

@Injectable({
  providedIn: 'root',
})
export class AntiFraudDetailsService {
  constructor(private paymentOrderWService: PaymentOrderWService, private authService: AuthService) {}

  public getAntiFraudDetails(id: string) {
    return this.paymentOrderWService.getApplicationDetails(id);
  }

  getManualCheckMode(paymentID: string): Observable<IGetManualCheckModeResponse> {
    return this.paymentOrderWService.getManualCheckMode({
      paymentID,
      checkType: 'AFS',
      userLogin: this.authService.user?.connectionName ?? 'Unknown_User',
    });
  }

  saveManualCheckMode(paymentID: string, status: string) {
    return this.paymentOrderWService.saveManualCheckMode({
      paymentID,
      manualCheck: {
        checkType: 'AFS',
        status,
      },
    });
  }
}
