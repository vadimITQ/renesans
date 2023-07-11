import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PaymentOrderWService } from '../payment-order-w/payment-order-w.service';
import { Pagination, TableService } from '../../../shared/services/table.service';
import { IAmlCheckFiltersForm } from "../../pages/PE/aml-check/aml-check-filters/aml-check-filters.types";
import { GetApplicationsListCheckType } from "../../../shared/enums/get-applications-list.enums";
import { IApplication, IGetApplicationsListPayload } from "../../../shared/types/get-applications-list";
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AmlCheckService extends TableService<IApplication, IGetApplicationsListPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getApplicationsList(payload: IGetApplicationsListPayload, pagination: Pagination) {
      return paymentOrderWService.getApplicationsList(payload, pagination, GetApplicationsListCheckType.AML).pipe(
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

  public $filter: BehaviorSubject<FormGroup<IAmlCheckFiltersForm> | null> = new BehaviorSubject<FormGroup<IAmlCheckFiltersForm> | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
