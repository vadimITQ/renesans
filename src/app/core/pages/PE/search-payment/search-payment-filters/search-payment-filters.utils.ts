import { ISearchPaymentFilterForm } from './search-payment-filters.types';
import { sub } from 'date-fns';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SearchPaymentFilterValidation, ValidationErrorsEnum } from './search-payment-filter.validation';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { ISearchPaymentsFiltersPayload } from 'src/app/core/services/search-payment/types';
import { DatePipe } from '@angular/common';
import { GlobalReactiveErrorsEnum } from 'src/app/shared/components/reactive-controls/global-error-messages';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';

@Injectable({
  providedIn: "root"
})
export class SearchPaymentsFilterUtils {

  constructor(
    private fb: FormBuilder,
    private validation: SearchPaymentFilterValidation,
    private toast: ToastService
  ) { }
  
  createDefaultFilterFormGroup(): FormGroup<ISearchPaymentFilterForm> {

    const dateTo = new Date();
    const dateFrom = sub(dateTo, { days: 3 });

    return this.fb.group<ISearchPaymentFilterForm>(
      {
        paymentID: new FormControl(""),
        applicationID: new FormControl(""),
        idPH: new FormControl(""),
        docID: new FormControl(""),
        linkedChequeId: new FormControl(""),
        docNum: new FormControl(""),
        account: new FormControl(""),
        chequeNumber: new FormControl(""),
        channelIP: new FormControl(""),
        userAgent: new FormControl(""),
        dateTimeFrom: new FormControl(dateFrom),
        dateTimeTo: new FormControl(dateTo),
        plannedDate: new FormControl(null),
        channelName: new FormControl([], { nonNullable: true }),
        codeStatuses: new FormControl([], { nonNullable: true }),
        parentType: new FormControl([], { nonNullable: true }),
        type: new FormControl([], { nonNullable: true })
      },
      {
        validators: (group) => this.validation.validateFilter(group as FormGroup<ISearchPaymentFilterForm>),
        updateOn: "change"
      }
    );
    
  }

  showErrorMessages(filter: FormGroup<ISearchPaymentFilterForm>) {

    const message = PEGlobalValidators.getErrorMessage(filter);
    
    if (!!message){
      this.toast.showErrorToast(
        message
      );
      return;
    }

  }

  prepareSearchFilters(filter: FormGroup<ISearchPaymentFilterForm>): ISearchPaymentsFiltersPayload { 
    const {
      paymentID,
      applicationID,
      idPH,
      docID,
      linkedChequeId,
      docNum,
      account,
      chequeNumber,
      channelIP,
      userAgent,
      dateTimeFrom,
      dateTimeTo,
      plannedDate,
      channelName,
      codeStatuses,
      parentType,
      type
    } = filter.controls;
    return {
      paymentID: paymentID.value,
      applicationID: applicationID.value,
      idPH: idPH.value,
      docID: docID.value,
      linkedChequeId: linkedChequeId.value,
      docNum: docNum.value,
      account: account.value,
      chequeNumber: chequeNumber.value,
      channelIP: channelIP.value,
      userAgent: userAgent.value,
      dateTimeFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? ""),
      dateTimeTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? ""),
      plannedDate: DatePickerHelper.convertToLocaleStringWithTimezone(plannedDate.value?.toISOString() ?? ""),
      statusCode: codeStatuses.value?.length > 0 ? codeStatuses.value.map(v => v.value) : null,
      channelName: channelName.value?.length > 0 ? channelName.value.map(v => v.value) : null,
      parentType: parentType.value?.length > 0 ? parentType.value.map(v => v.value) : null,
      type: type.value?.length > 0 ? type.value.map(v => v.value) : null
    }
  }

}