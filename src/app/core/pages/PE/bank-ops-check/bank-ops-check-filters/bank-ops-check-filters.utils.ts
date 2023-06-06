import { IBankOpsCheckFilterForm } from './bank-ops-check-filters.types';
import { IBankOpsCheckFiltersPayload } from '../../../../services/bank-ops-check/types';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BankOpsCheckFilterValidation, ValidationErrorsEnum } from './bank-ops-check-filter.validation';
import { GlobalReactiveErrorsEnum } from 'src/app/shared/components/reactive-controls/global-error-messages';
import { ToastService } from 'src/app/shared/services/toast.service';
import { sub } from 'date-fns';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';

@Injectable({
  providedIn: 'root'
})
export class BankOpsCheckFilterUtils {

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private validation: BankOpsCheckFilterValidation
  ) { }

  createDefaultForm(): FormGroup<IBankOpsCheckFilterForm> {
    const dateTo = new Date();
    const dateFrom = sub(dateTo, { days: 3 });
    return this.fb.group<IBankOpsCheckFilterForm>(
      {
        applicationID: new FormControl(""),
        dateTimeFrom: new FormControl(dateFrom),
        dateTimeTo: new FormControl(dateTo),
        paymentID: new FormControl(""),
        applicationStatus: new FormControl([], { nonNullable: true })
      },
      {
        validators: (group) => this.validation.validateFilter(group as FormGroup<IBankOpsCheckFilterForm>),
        updateOn: 'change'
      }
    );
  }

  prepareSearchFilter(filter: FormGroup<IBankOpsCheckFilterForm>): IBankOpsCheckFiltersPayload {

    const {
      dateTimeFrom,
      dateTimeTo,
      paymentID,
      applicationID,
      applicationStatus
    } = filter.controls;

    return {
      applicationID: applicationID.value,
      paymentID: paymentID.value,
      dateTimeFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? ''),
      dateTimeTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? ''),
      applicationStatus: applicationStatus.value.map(v => v.value)
    };

  }

  showErrorMessages(filter: FormGroup<IBankOpsCheckFilterForm>): void {
    const errors = Object.keys(filter.errors ?? {});

    if (errors.includes(ValidationErrorsEnum.ValidateOnEmpty)) {
      this.toast.showErrorToast(
        this.validation.messages[ValidationErrorsEnum.ValidateOnEmpty]
      );
      return;
    }

    const message = PEGlobalValidators.getLastErrorMessage(filter);
    if (!!message){
      this.toast.showErrorToast(
        message
      );
      return;
    }
    
  }

}
