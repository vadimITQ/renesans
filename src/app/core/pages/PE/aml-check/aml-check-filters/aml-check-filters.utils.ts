import { subDays } from 'date-fns';
import { IAmlCheckFiltersForm} from "./aml-check-filters.types";
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';
import { AmlCheckFilterValidation } from './aml-check-filter.validation';
import { IGetApplicationsListPayload } from 'src/app/shared/types/get-applications-list';

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
        applicationStatuses: new FormControl([{ label: 'Ожидает рассмотрения AML', value: '1' }]),
        agedOnly: new FormControl(false, { nonNullable: true })
      },
      {
        updateOn: 'change',
        validators: (filter) => this.validation.validateFilter(filter as FormGroup<IAmlCheckFiltersForm>)
      }
    )
  }

  prepareFilterValues(filter: FormGroup<IAmlCheckFiltersForm>): IGetApplicationsListPayload {
    
    const {
      dateTimeFrom,
      dateTimeTo,
      paymentID,
      applicationID,
      applicationStatuses,
      agedOnly
    } = filter.controls;

    return {
      applicationID: applicationID.value ?? undefined,
      paymentID: paymentID.value ?? undefined,
      dateTimeFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? null) ?? undefined,
      dateTimeTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? null) ?? undefined,
      applicationStatuses: applicationStatuses.value?.map(v => v.value) ?? undefined,
      agedOnly: agedOnly.value
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
