import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GetPaymentsResponse, ManualChecksFilter } from '../../../shared/models/manual-checks-models';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { validateFilter } from '../../pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.validation';
import { sortPaymentData, setRowStatuses } from '../../pages/PE/manual-checks/manual-checks-result/manual-checks-result.utils';
import { ICancelPaymentPayload, IResumePaymentPayload } from '../payment-order-w/types';

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private toastService: ToastService
  ) { }

  public $paymentResponseState: BehaviorSubject<GetPaymentsResponse[] | null | undefined> = new BehaviorSubject<GetPaymentsResponse[] | null | undefined>(undefined);

  public getPayments(filter: ManualChecksFilter) {
    const filterValidation = validateFilter(filter);
    if (filterValidation.success){
      this.$paymentResponseState.next(null);
      return this.paymentOrderWService.getPayments("ManualChecks").pipe(
        tap(response => {
          if (this.instanceOfGetPayments(response)){
            const sortedData = sortPaymentData(setRowStatuses(response));
            this.$paymentResponseState.next(sortedData);
          }
      }),
      catchError((error) => {
        this.toastService.showErrorToast("Внутренняя ошибка сервиса. Возникла ошибка при получении информации об ошибочных переводах/платежах");
        return error;
      }),
      delay(2000));
    }
    else {
      this.toastService.showErrorToast(filterValidation.validationMessage!);
      return of([]);
    }
  }

  public cancelPayment(payload: ICancelPaymentPayload){
    this.paymentOrderWService.cancelPayment(payload);
  }

  public resumePayment(payload: IResumePaymentPayload){
    this.paymentOrderWService.resumePayment(payload);
  }

  private instanceOfGetPayments(object:any): object is GetPaymentsResponse[] {
    return !!object && 'amount' in object[0];
  }
  

}
