import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GetPaymentsResponse, ManualChecksFilter } from '../../../shared/models/manual-checks-models';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { validateFilter } from '../../pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.validation';
import { sortPaymentData } from '../../pages/PE/manual-checks/manual-checks-result/manual-checks-result.utils';

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private toastService: ToastService
  ) { }

  public $paymentResponseState: BehaviorSubject<GetPaymentsResponse[] | null | undefined> = new BehaviorSubject<GetPaymentsResponse[] | null | undefined>(undefined);

  public getPayments(filter: ManualChecksFilter): Observable<GetPaymentsResponse[]>{
    const filterValidation = validateFilter(filter);
    if (filterValidation.success){
      this.$paymentResponseState.next(null);
      return this.paymentOrderWService.getPayments().pipe(
        delay(2000), 
        tap(response => {
          const sortedData = sortPaymentData(response);
          this.$paymentResponseState.next(sortedData);
      }));
    }
    else {
      this.toastService.showErrorToast(filterValidation.validationMessage!);
      return of([]);
    }
  }
  
}
