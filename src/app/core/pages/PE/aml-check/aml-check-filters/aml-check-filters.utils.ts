import { subDays } from 'date-fns';
import { IAmlCheckFiltersForm} from "./aml-check-filters.types";
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAmlCheckFiltersPayload } from "src/app/core/services/aml-check/types";
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';
import { AmlCheckFilterValidation } from './aml-check-filter.validation';

@Injectable({
  providedIn: "root"
})
export class AmlCheckFiltersUtils {

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private validation: AmlCheckFilterValidation
  ){}

  createDefaultFilter(): FormGroup<IAmlCheckFiltersForm> {
    const dateTo = new Date();
    const dateFrom = subDays(dateTo, 3);
    return this.fb.group<IAmlCheckFiltersForm>(
      {
        dateTimeFrom: new FormControl(dateFrom),
        dateTimeTo: new FormControl(dateTo),
        paymentID: new FormControl(null),
        applicationID: new FormControl(null),
        applicationStatus: new FormControl([], { nonNullable: true }),
        onlyExpired: new FormControl(false, { nonNullable: true })
      },
      {
        updateOn: 'change',
        validators: (filter) => this.validation.validateFilter(filter as FormGroup<IAmlCheckFiltersForm>)
      }
    )
  }

  prepareFilterValues(filter: FormGroup<IAmlCheckFiltersForm>): IAmlCheckFiltersPayload {
    
    const {
      dateTimeFrom,
      dateTimeTo,
      paymentID,
      applicationID,
      applicationStatus,
      onlyExpired
    } = filter.controls;

    return {
      applicationID: applicationID.value,
      paymentID: paymentID.value,
      dateTimeFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? null),
      dateTimeTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? null),
      applicationStatus: applicationStatus.value.map(v => v.value) ?? null,
      onlyExpired: onlyExpired.value
    };

  }

  showErrorMessages(filter: FormGroup<IAmlCheckFiltersForm>): void {

    const message = PEGlobalValidators.getErrorMessage(filter);

    console.log(filter, message);
    
    if (!!message){
      this.toast.showErrorToast(
        message
      );
      return;
    }

  }

}