import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { Pagination, TableService } from '../../../shared/services/table.service';
import { IBankOpsCheckFilterForm } from "../../pages/PE/bank-ops-check/bank-ops-check-filters/bank-ops-check-filters.types";
import { FormGroup } from '@angular/forms';
import { IBankOpsCheckFilters } from '../../pages/PE/bank-ops-check/bank-ops-check-filters/bank-ops-check-filters.types';
import { GetApplicationsListCheckType } from "../../../shared/enums/get-applications-list.enums";
import { IApplication, IGetApplicationsListPayload } from "../../../shared/types/get-applications-list";

@Injectable({
  providedIn: 'root',
})
export class BankOpsCheckService extends TableService<IApplication, IGetApplicationsListPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getApplicationsList(payload: IGetApplicationsListPayload, pagination: Pagination) {
      return paymentOrderWService.getApplicationsList(payload, pagination,GetApplicationsListCheckType.BANK_OPS).pipe(
        map(value => ({ ...value, data: value.applications })),
        catchError(error => {
          if (error.status !== 401) {
            toastService.showErrorToast(
              'Внутренняя ошибка сервиса. Возникла ошибка при получении информации о платежах.',
            );
          }
          return of(error);
        }),
      );
    }
    super(getApplicationsList);
  }

  public $filter: BehaviorSubject<FormGroup<IBankOpsCheckFilterForm> | null> = new BehaviorSubject<FormGroup<IBankOpsCheckFilterForm> | null>(null);
  public $filters: BehaviorSubject<IBankOpsCheckFilters | null> = new BehaviorSubject<IBankOpsCheckFilters | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
