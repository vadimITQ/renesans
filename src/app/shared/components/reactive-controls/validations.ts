import { FormGroup } from "@angular/forms";
import { PEReactiveHelper } from "./utils";
import { ManualChecksFilter } from "src/app/core/pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.types";
import { ISearchPaymentFilterForm } from "src/app/core/pages/PE/search-payment/search-payment-filters/search-payment-filters.types";

export enum GlobalReavtiveErrorsEnum {
  Required = "required",
  DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
  DatesRangeLimit = "datesRangeLimit",
  EmptyError = "emptyError",
  FormGroupNoValid = "searchPaymentsFormNoValid"
}

export class PEGlobalValidators {

    public static validateDates(group: FormGroup<ManualChecksFilter> | FormGroup<ISearchPaymentFilterForm>): void {
      if (PEReactiveHelper.isFormGroup(group)){
        const dateFrom = group.controls.dateTimeFrom;
        const dateTo = group.controls.dateTimeTo;
        const dateFromValue = dateFrom.value as Date;
        const dateToValue = dateTo.value as Date;
        const timeValueFrom = dateFromValue?.getTime() ?? 0;
        const timeValueTo = dateToValue?.getTime() ?? 0;
        const range: number = (timeValueTo - timeValueFrom) / (1000 * 60 * 60 * 24);

        if (!dateFromValue && !dateToValue){
          dateFrom.setErrors(null);
          dateTo.setErrors(null);
          return;
        }

        if (!dateFromValue || !dateToValue) {
          !dateFromValue ? dateFrom.setErrors({[GlobalReavtiveErrorsEnum.Required]: true }): "";
          !dateToValue ? dateTo.setErrors({[GlobalReavtiveErrorsEnum.Required]: true }): "";
          group.setErrors({
            [GlobalReavtiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReavtiveErrorsEnum.Required]: true
          });
          return;
        }

        if (timeValueFrom > timeValueTo){
          dateFrom.setErrors({[GlobalReavtiveErrorsEnum.DateFromMoreThanDateTo]: true});
          dateTo.setErrors({[GlobalReavtiveErrorsEnum.EmptyError]: true })
          group.setErrors({
            [GlobalReavtiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReavtiveErrorsEnum.DateFromMoreThanDateTo]: true
          });
          return;
        }

        if (range > 40){
          dateFrom.setErrors({[GlobalReavtiveErrorsEnum.EmptyError]: true })
          dateTo.setErrors({[GlobalReavtiveErrorsEnum.DatesRangeLimit]: true })
          group.setErrors({
            [GlobalReavtiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReavtiveErrorsEnum.DatesRangeLimit]: true
          });
          return;
        }

      }

    }

}