
import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { antiFraudDetails } from "../../pages/PE/anti-fraud-details/anti-fraud-details.mock";
import { PaymentOrderWService } from "../payment-order-w/payment-order-w.service";
import { AuthService } from "../auth/auth.service";
import { IGetManualCheckModeResponse } from "../payment-order-w/types";

@Injectable({
    providedIn: "root"
})
export class AntiFraudDetailsService {

    constructor(
      private paymentOrderW: PaymentOrderWService,
      private authService: AuthService
    ){}

    public getAntiFraudDetails(): Observable<any> {
        return of(antiFraudDetails).pipe(delay(2000));
    }

    getManualCheckMode(paymentID: string): Observable<IGetManualCheckModeResponse> {
      return this.paymentOrderW.getManualCheckMode({
        paymentID: paymentID,
        checkType: 'AFS',
        userLogin: this.authService.user?.connectionName ?? 'Unknown_User'
      });
    }

    saveManualCheckMode(paymentID: string, status: string) {
      return this.paymentOrderW.saveManualCheckMode({
        paymentID: paymentID,
        manualCheck: {
          checkType: "AFS",
          status: status
        }
      });
    }

}