import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { ISearchPaymentsPayload, ISearchPaymentsResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class SearchPaymentService {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {}

  public $paymentResponseState: BehaviorSubject<ISearchPaymentsResponse[] | null> = new BehaviorSubject<ISearchPaymentsResponse[] | null>(
    null,
  );
  public $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public getSearchPayments(payload: ISearchPaymentsPayload) {
    this.$paymentResponseState.next(null);
    this.$loading.next(true)
    return this.paymentOrderWService.getSearchPayments(payload).pipe(
      tap(response => {
        if(response && !response.length) {
          this.toastService.showWarnToast('Ничего не найдено, проверьте параметры запроса и интервалы дат', "Сообщение")
        }
        this.$paymentResponseState.next(response);
        this.$loading.next(false)
      })
    );
  }
}
