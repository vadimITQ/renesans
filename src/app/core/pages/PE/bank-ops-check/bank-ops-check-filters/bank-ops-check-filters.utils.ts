import { IBankOpsCheckFilterForm } from './bank-ops-check-filters.types';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BankOpsCheckFilterValidation, ValidationErrorsEnum } from './bank-ops-check-filter.validation';
import { ToastService } from 'src/app/shared/services/toast.service';
import { sub } from 'date-fns';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';
import { IGetApplicationsListPayload } from 'src/app/shared/types/get-applications-list';

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
        manualBankOpsCheckStatusList: new FormControl([{ label: 'Ожидает рассмотрения BankOps', value: '1' }])
      },
      {
        validators: (group) => this.validation.validateFilter(group as FormGroup<IBankOpsCheckFilterForm>),
        updateOn: 'change'
      }
    );
  }

  prepareSearchFilter(filter: FormGroup<IBankOpsCheckFilterForm>): IGetApplicationsListPayload {

    const {
      dateTimeFrom,
      dateTimeTo,
      paymentID,
      applicationID,
      manualBankOpsCheckStatusList
    } = filter.controls;

    return {
      applicationID: applicationID.value ?? undefined,
      paymentID: paymentID.value ?? undefined,
      dateTimeFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? '') ?? undefined,
      dateTimeTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? '') ?? undefined,
      manualBankOpsCheckStatusList: manualBankOpsCheckStatusList.value?.map(v => v.value) ?? undefined
    };

  }

  showErrorMessages(filter: FormGroup<IBankOpsCheckFilterForm>): void {

    const message = PEGlobalValidators.getErrorMessage(filter);
    
    if (!!message){
      this.toast.showErrorToast(
        message
      );
      return;
    }
    
  }

}
