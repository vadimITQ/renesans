
import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import {amlDetailsMockData} from "../../pages/PE/aml-details/aml-details.mock";
import { PaymentOrderWService } from "../payment-order-w/payment-order-w.service";
import { AuthService } from "../auth/auth.service";
import { IGetManualCheckModeResponse } from "../payment-order-w/types";

@Injectable({
    providedIn: "root"
})
export class AmlDetailsService {

    constructor(
        private paymentOrderW: PaymentOrderWService,
        private authService: AuthService
    ) {}

    getAmlDetails() {
        return of(amlDetailsMockData).pipe(delay(500));
    }

    getManualCheckMode(paymentID: string): Observable<IGetManualCheckModeResponse> {
        return this.paymentOrderW.getManualCheckMode({
          paymentID: paymentID,
          checkType: 'AML',
          userLogin: this.authService.user?.connectionName ?? 'Unknown_User'
        });
      }
  
      saveManualCheckMode(paymentID: string, status: string) {
        return this.paymentOrderW.saveManualCheckMode({
          paymentID: paymentID,
          manualCheck: {
            checkType: "AML",
            status: status
          }
        });
      }

}
