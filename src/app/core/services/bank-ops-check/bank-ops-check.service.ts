import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map,  of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { Pagination, TableService } from '../../../shared/services/table.service';
import {IBankOpsCheck, IBankOpsCheckFiltersPayload} from "./types";
import {IBankOpsCheckFilters} from "../../pages/PE/bank-ops-check/bank-ops-check-filters/bank-ops-check-filters.types";
import {bankOpsCheckTableMock} from "../../pages/PE/bank-ops-check/bank-ops-check-table/bank-ops-check-table.mock";

@Injectable({
  providedIn: 'root',
})
export class BankOpsCheckService extends TableService<IBankOpsCheck, IBankOpsCheckFiltersPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getApplicationsList(payload: IBankOpsCheckFiltersPayload, pagination: Pagination) {
      return of({...bankOpsCheckTableMock, data: bankOpsCheckTableMock.bankOpsChecks}).pipe(delay(1000))
      // return paymentOrderWService.getApplicationsList(payload, pagination).pipe(
      //   map(value => ({ ...value, data: value.bankOpsChecks })),
      //   catchError(error => {
      //     if (error.status !== 401) {
      //       toastService.showErrorToast(
      //         'Внутренняя ошибка сервиса. Возникла ошибка при получении информации о платежах.',
      //       );
      //     }
      //     return of(error);
      //   }),
      // );
    }
    super(getApplicationsList);
  }

  public $filters: BehaviorSubject<IBankOpsCheckFilters | null> = new BehaviorSubject<IBankOpsCheckFilters | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
