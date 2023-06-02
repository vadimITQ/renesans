import { ISearchPaymentFilterForm, ISearchPaymentFilters } from './search-payment-filters.types';
import { sub } from 'date-fns';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SearchPaymentFilterValidation, ValidationErrorsEnum } from './search-payment-filter.validation';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { ISearchPaymentsFiltersPayload } from 'src/app/core/services/search-payment/types';
import { Validation } from 'src/app/shared/validation/types';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: "root"
})
export class SearchPaymentsFilterUtils {

  constructor(
    private fb: FormBuilder,
    private validation: SearchPaymentFilterValidation,
    private toast: ToastService,
    private datePipe: DatePipe
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
    const errors = Object.keys(filter.errors ?? {});

      if (errors.includes(ValidationErrorsEnum.ValidateOnEmpty)){
        this.toast.showErrorToast(
          this.validation.messages[ValidationErrorsEnum.ValidateOnEmpty]
        );
        return;
      }

      if (errors.includes(ValidationErrorsEnum.DateFromMoreThanDateTo)){
        this.toast.showErrorToast(
          this.validation.messages[ValidationErrorsEnum.DateFromMoreThanDateTo]
        );
        return;
      }

      if (errors.includes(ValidationErrorsEnum.DatesRangeLimit)){
        this.toast.showErrorToast(
          this.validation.messages[ValidationErrorsEnum.DatesRangeLimit]
        );
        return;
      }

      if (errors.includes(ValidationErrorsEnum.Required)){
        this.toast.showErrorToast(
          "Заполните обязательные поля"
        );
        return;
      }

      if (errors.includes(ValidationErrorsEnum.PlannedDateNoValid)){
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.toast.showErrorToast(
          `Плановая дата не должна быть раньше, чем ${ this.datePipe.transform(today, "dd/MM/yyyy") }`
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

export function defineDefaultFiltersValues(): ISearchPaymentFilters {
  const dateTo = new Date();
  const dateFrom = sub(dateTo, { days: 3 });

  return {
    paymentID: null,
    applicationID: null,
    idPH: null,
    docID: null,
    linkedChequeId: null,
    docNum: null,
    account: null,
    channelIP: null,
    userAgent: null,
    chequeNumber: null,
    statusCode: null,
    dateTimeFrom: DatePickerHelper.convertToDatePicker(dateFrom),
    dateTimeTo: DatePickerHelper.convertToDatePicker(dateTo),
    plannedDate: null,
    channelName: [],
    parentType: [],
    type: [],
    codeStatuses: [],
  };
}

export function anyFieldFilledValidator(filters: ISearchPaymentFilters): Validation | null {
  const {
    paymentID,
    applicationID,
    idPH,
    docID,
    linkedChequeId,
    docNum,
    account,
    chequeNumber,
    dateTimeFrom,
    dateTimeTo,
    plannedDate,
    channelName,
    codeStatuses,
    parentType,
    type,
  } = filters;
  const isAnyFieldFilled = [
    paymentID,
    applicationID,
    idPH,
    docID,
    linkedChequeId,
    docNum,
    account,
    chequeNumber,
    dateTimeFrom,
    dateTimeTo,
    plannedDate,
    channelName.length,
    codeStatuses.length,
    parentType.length,
    type.length,
  ].some(value => !!value);

  if (!isAnyFieldFilled) {
    return {
      paymentID: ' ',
      applicationID: ' ',
      idPH: ' ',
      docID: ' ',
      linkedChequeId: ' ',
      docNum: ' ',
      account: ' ',
      chequeNumber: ' ',
      dateFrom: ' ',
      dateTo: ' ',
      plannedDate: ' ',
      channelName: ' ',
      codeStatuses: ' ',
      parentType: ' ',
      type: ' ',
    };
  }

  return null;
}

export function generalFieldsFilled(filters: ISearchPaymentFilters): boolean {
  const {
    paymentID,
    applicationID,
    idPH,
    docID,
    linkedChequeId,
    docNum,
    account,
    chequeNumber,
    plannedDate,
    channelName,
    codeStatuses,
    parentType,
    type,
  } = filters;

  return [
    paymentID,
    applicationID,
    idPH,
    docID,
    linkedChequeId,
    docNum,
    account,
    chequeNumber,
    plannedDate,
    channelName.length,
    codeStatuses.length,
    parentType.length,
    type.length,
  ].some(Boolean);
}

export function prepareSearchFilters({
  paymentID,
  applicationID,
  idPH,
  docID,
  linkedChequeId,
  docNum,
  account,
  channelIP,
  userAgent,
  chequeNumber,
  statusCode,
  dateTimeFrom,
  dateTimeTo,
  plannedDate,
  channelName,
  parentType,
  type,
  codeStatuses,
}: ISearchPaymentFilters): ISearchPaymentsFiltersPayload {
  return {
    dateTimeFrom: !!dateTimeFrom ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom) : null,
    dateTimeTo: !!dateTimeTo ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo) : null,
    paymentID: !!paymentID ? paymentID : null,
    applicationID: !!applicationID ? applicationID : null,
    idPH: !!idPH ? idPH : null,
    docID: !!docID ? docID : null,
    docNum: !!docNum ? docNum : null,
    userAgent: !!userAgent ? userAgent : null,
    account: !!account ? account : null,
    channelIP: !!channelIP ? channelIP : null,
    chequeNumber: !!chequeNumber ? chequeNumber : null,
    linkedChequeId: !!linkedChequeId ? linkedChequeId : null,
    plannedDate: !!plannedDate ? DatePickerHelper.convertToLocaleStringWithTimezone(plannedDate) : null,
    statusCode: codeStatuses?.length > 0 ? codeStatuses.map(v => v.value) : null,
    channelName: channelName?.length > 0 ? channelName.map(v => v.value) : null,
    parentType: parentType?.length > 0 ? parentType.map(v => v.value) : null,
    type: type?.length > 0 ? type.map(v => v.value) : null,
  };
}
