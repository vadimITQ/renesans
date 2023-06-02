
import { sub } from "date-fns";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ISearchPaymentsFiltersPayload } from "src/app/core/services/search-payment/types";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ManualChecksValidation, ValidationErrorsEnum } from "./manual-checks-filter.validation";
import { ToastService } from "src/app/shared/services/toast.service";
import { ManualChecksFilter } from "./manual-checks-filter.types";

@Injectable({
  providedIn: "root"
})
export class ManualChecksHelper {

  constructor(
    private fb: FormBuilder, 
    private validation: ManualChecksValidation,
    private toast: ToastService
  ){}

  createDefaultForm(): FormGroup<ManualChecksFilter> {
    const dateTo = new Date();
    const dateFrom = sub(dateTo, { days: 3 });
    return this.fb.group<ManualChecksFilter>(
      {
        paymentID: new FormControl(""),
        applicationID: new FormControl(""),
        idPH: new FormControl(""),
        dateTimeFrom: new FormControl(dateFrom),
        dateTimeTo: new FormControl(dateTo),
        account: new FormControl(""),
        channelName: new FormControl([], { nonNullable: true }),
        codeStatuses: new FormControl([], { nonNullable: true }),
        parentType: new FormControl([], { nonNullable: true })
      },
      {
        validators: (group) => this.validation.validateFilter(group as FormGroup<ManualChecksFilter>),
        updateOn: "change"
      }
    );
  }

  prepareSearchFilters(filter: FormGroup<ManualChecksFilter>): ISearchPaymentsFiltersPayload {
    const {
      account,
      applicationID,
      channelName,
      codeStatuses,
      dateTimeFrom,
      dateTimeTo,
      idPH,
      parentType,
      paymentID
    } = filter.controls;
    return {
      account: account.value,
      applicationID: applicationID.value,
      channelName: channelName.value?.length > 0 ? channelName.value.map(v => v.value) : null,
      statusCode: codeStatuses.value?.length > 0 ? codeStatuses.value.map(v => v.value) : null,
      dateTimeFrom: DatePickerHelper.convertToDatePicker(dateTimeFrom.value),
      dateTimeTo: DatePickerHelper.convertToDatePicker(dateTimeTo.value),
      idPH: idPH.value,
      parentType: parentType.value?.length > 0 ? parentType.value.map(v => v.value) : null,
      paymentID: paymentID.value,
      docID: null,
      docNum: null,
      userAgent: null,
      channelIP: null,
      chequeNumber: null,
      linkedChequeId: null,
      plannedDate: null,
      type: null,
    }
  }

  showErrorMessages(filter: FormGroup<ManualChecksFilter>) {
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

  }

};