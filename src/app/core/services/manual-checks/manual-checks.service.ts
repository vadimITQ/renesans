import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { validateFilter } from '../../pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.validation';
import { ICancelPaymentPayload, IResumePaymentPayload } from '../payment-order-w/types';
import { prepareSearchFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';
import { ISearchPaymentsResponse } from '../search-payment/types';
import { ISearchPaymentFilters } from '../../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private toastService: ToastService
  ) { }

  public $paymentResponseState: BehaviorSubject<ISearchPaymentsResponse[] | null | undefined> = new BehaviorSubject<ISearchPaymentsResponse[] | null | undefined>(undefined);

  public getPayments(filter: ISearchPaymentFilters): Observable<any> {
    const filterValidation = validateFilter(filter);
    if (filterValidation.success){
      this.$paymentResponseState.next(null);
      return this.paymentOrderWService.getSearchPayments(prepareSearchFilters(filter)).pipe(
        tap(response => {
          // const sortedData = sortPaymentData(setRowStatuses(response));
          if (!response?.length){
            this.toastService.showWarnToast("Ничего не найдено, проверьте параметры запроса и интервалы дат", "Сообщение");
            this.$paymentResponseState.next(undefined);
            return;
          }
          this.$paymentResponseState.next(response);
      }),
      catchError((error) => {
        this.toastService.showErrorToast("Внутренняя ошибка сервиса. Возникла ошибка при получении информации об ошибочных переводах/платежах");
        this.$paymentResponseState.next(undefined);
        return of(error);
      }),
      delay(2000));
      // return this.paymentOrderWService.getPayments("ManualChecks").pipe(
      //   tap(response => {
      //     if (this.instanceOfGetPayments(response)){
      //       const sortedData = sortPaymentData(setRowStatuses(response));
      //       this.$paymentResponseState.next(sortedData);
      //     }
      // }),
      // catchError((error) => {
      //   this.toastService.showErrorToast("Внутренняя ошибка сервиса. Возникла ошибка при получении информации об ошибочных переводах/платежах");
      //   return error;
      // }),
      // delay(2000));
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
  

}
