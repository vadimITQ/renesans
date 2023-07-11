import { Injectable } from "@angular/core";
import { BehaviorSubject, of, map, catchError } from "rxjs";
import { Pagination, TableService } from "src/app/shared/services/table.service";
import { IApplication, IGetApplicationsListPayload } from "../../../shared/types/get-applications-list";
import { PaymentOrderWService } from "../payment-order-w/payment-order-w.service";
import { ToastService } from "../../../shared/services/toast.service";
import { GetApplicationsListCheckType } from "../../../shared/enums/get-applications-list.enums";
import { FormGroup } from "@angular/forms";
import { AntiFraudCheckFilterForm } from "../../pages/PE/anti-fraud-check/anti-fraud-check-filter/anti-fraud-checks-filter.types";

@Injectable({
    providedIn: 'root'
})
export class AntiFraudCheckService extends TableService<IApplication, IGetApplicationsListPayload> {
  constructor(private paymentOrderWService: PaymentOrderWService, private toastService: ToastService) {
    function getApplicationsList(payload: IGetApplicationsListPayload, pagination: Pagination) {
      return paymentOrderWService.getApplicationsList(payload, pagination, GetApplicationsListCheckType.AFS).pipe(
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

  public $filter: BehaviorSubject<FormGroup<AntiFraudCheckFilterForm> | null> = new BehaviorSubject<FormGroup<AntiFraudCheckFilterForm> | null>(null);
  public $reportLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
