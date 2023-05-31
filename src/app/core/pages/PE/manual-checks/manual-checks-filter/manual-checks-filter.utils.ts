
import { sub } from "date-fns";
import { ManualChecksFilter, ManualChecksProps } from '../../../../../shared/models/manual-checks-models';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ISearchPaymentsFiltersPayload } from "src/app/core/services/search-payment/types";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ManualChecksValidation, ValidationErrorsEnum } from "./manual-checks-filter.validation";
import { ToastService } from "src/app/shared/services/toast.service";

@Injectable({
  providedIn: "root"
})
export class ManualChecksHelper {

  constructor(
    private fb: FormBuilder, 
    private validation: ManualChecksValidation,
    private toast: ToastService
  ){}

  defineDefaultFiltersValues(): ManualChecksProps {
    const dateTo = new Date();
    const dateFrom = sub(dateTo, { days: 3 });

    return {
      account: null,
      applicationID: null,
      channelName: [],
      codeStatuses: [],
      dateTimeFrom: dateFrom,
      dateTimeTo: dateTo,
      idPH: null,
      parentType: [],
      paymentID: null
    };
  }

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
    const values: ManualChecksProps = {
      account: filter.controls.account.value,
      applicationID: filter.controls.account.value,
      channelName: filter.controls.channelName.value,
      codeStatuses: filter.controls.codeStatuses.value,
      dateTimeFrom: filter.controls.dateTimeFrom.value,
      dateTimeTo: filter.controls.dateTimeTo.value,
      idPH: filter.controls.idPH.value,
      parentType: filter.controls.parentType.value,
      paymentID: filter.controls.paymentID.value
    }
    return {
      account: values.account,
      applicationID: values.applicationID,
      channelName: values.channelName?.length > 0 ? values.channelName.map(v => v.value) : null,
      statusCode: values.codeStatuses?.length > 0 ? values.codeStatuses.map(v => v.value) : null,
      dateTimeFrom: DatePickerHelper.convertToDatePicker(values.dateTimeFrom),
      dateTimeTo: DatePickerHelper.convertToDatePicker(values.dateTimeTo),
      idPH: values.idPH,
      parentType: values.parentType?.length > 0 ? values.parentType.map(v => v.value) : null,
      paymentID: values.paymentID,
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