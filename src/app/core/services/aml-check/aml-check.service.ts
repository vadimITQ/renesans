import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map,  of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { Pagination, TableService } from '../../../shared/services/table.service';
import {IAmlCheck, IAmlCheckFiltersPayload} from "./types";
import {IAmlCheckFiltersForm} from "../../pages/PE/aml-check/aml-check-filters/aml-check-filters.types";
import {amlCheckTableMock} from "../../pages/PE/aml-check/aml-check-table/aml-check-table.mock";
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AmlCheckService extends TableService<IAmlCheck, IAmlCheckFiltersPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getApplicationsList(payload: IAmlCheckFiltersPayload, pagination: Pagination) {
      return of({...amlCheckTableMock, data: amlCheckTableMock.amlChecks}).pipe(delay(1000))
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

  public $filter: BehaviorSubject<FormGroup<IAmlCheckFiltersForm> | null> = new BehaviorSubject<FormGroup<IAmlCheckFiltersForm> | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
