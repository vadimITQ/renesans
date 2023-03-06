import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { GetPaymentsResponse, ManualChecksFilter } from '../../../shared/models/manual-checks-models';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';

@Injectable({
  providedIn: 'root'
})
export class ManualChecksService {

  constructor(
    private paymentOrderWService: PaymentOrderWService,
    private toastService: ToastService
  ) { }

  public $paymentResponseState: BehaviorSubject<GetPaymentsResponse[] | null | undefined> = new BehaviorSubject<GetPaymentsResponse[] | null | undefined>(undefined);

  getPayments(filter: ManualChecksFilter): Observable<GetPaymentsResponse[]>{
    if (this.validateFilter(filter)){
      this.$paymentResponseState.next(null);
      return this.paymentOrderWService.getPayments().pipe(
        delay(2000), 
        tap(response => {
          const sortedData = this.sortPaymentData(response);
          this.$paymentResponseState.next(sortedData);
      }));
    }
    else {
      return of([]);
    }
  }

  private sortPaymentData(paymentData: GetPaymentsResponse[] | null | undefined): GetPaymentsResponse[] | null | undefined {
    if (!paymentData)
      return paymentData;
    return paymentData.sort((a, b) => {
      if (a.manualParse === 1 && b.manualParse !== 1) {
        return -1;
      }
      if (b.manualParse === 1 && a.manualParse !== 1){
        return 1;
      }
      if (a.manualParse === 1 && b.manualParse === 1){
        return 0;
      }
      if ((a.manualParse === 2 || a.manualParse === 3) && (b.manualParse === 2 || b.manualParse === 3)){
        if (a.status === b.status){
          return 0;
        }
        if (a.status === "Успешные статусы платежа/перевода"){
          return -1;
        }
        else {
          return 1;
        }
      }
      return 0;
    });
  }

  validateFilter(filter: ManualChecksFilter): boolean {
    const noFilter: boolean = !filter;
    const filterHasDates: boolean = !!filter.dateFrom && !!filter.dateTo;
    const filterHasId: boolean = !!filter.paymentID || !!filter.applicationID || !!filter.paymentHubPaymentId || !!filter.account;
    if (noFilter || (!filterHasDates && !filterHasId)){
      this.toastService.showErrorToast("Не указаны необходимые параметры поиска");
      return false;
    }
    if (filterHasDates){
      const dateFrom = new Date(filter.dateFrom as string);
      const dateTo = new Date(filter.dateTo as string);
      const datesInvalid: boolean = dateFrom!.getTime() > dateTo!.getTime();
      const diffDatesInDays = this.dateDiffInDays(dateFrom as Date, dateTo as Date);
      console.log(diffDatesInDays);
      if (datesInvalid){
        this.toastService.showErrorToast("«Дата/Время с» превышает «Дата/Время по»");
        return false;
      }
      if (diffDatesInDays > 40){
        this.toastService.showErrorToast("Диапазон дат не должен превышать 40 дней");
        return false;
      }
    }
    return true;
  }

  private dateDiffInDays(dateFrom: Date, dateTo: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
    const utc2 = Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  
}
