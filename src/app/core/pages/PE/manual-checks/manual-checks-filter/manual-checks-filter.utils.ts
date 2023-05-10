
import { sub } from "date-fns";
import { ManualChecksFilter, ManualChecksProps } from '../../../../../shared/models/manual-checks-models';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ISearchPaymentsFiltersPayload } from "src/app/core/services/search-payment/types";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ManualChecksValidation } from "./manual-checks-filter.validation";

@Injectable({
  providedIn: "root"
})
export class ManualChecksHelper {

  constructor(private fb: FormBuilder, private validation: ManualChecksValidation){}

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
        validators: (c) => this.validation.validateEmpty(c as FormGroup<ManualChecksFilter>),
        updateOn: "change"
      }
    );
    // return this.fb.group<ManualChecksFilter>(
    //   {
    //     paymentID: new FormControl("",          { validators: [this.validation.validateFilterControlsOnEmpty] }),
    //     applicationID: new FormControl("",      { validators: [this.validation.validateFilterControlsOnEmpty] }),
    //     idPH: new FormControl("",               { validators: [this.validation.validateFilterControlsOnEmpty] }),
    //     dateTimeFrom: new FormControl(dateFrom, { validators: [this.validation.validateFilterControlsOnEmpty, this.validation.validateDates] }),
    //     dateTimeTo: new FormControl(dateTo,     { validators: [this.validation.validateFilterControlsOnEmpty, this.validation.validateDates] }),
    //     account: new FormControl("",            { validators: [this.validation.validateFilterControlsOnEmpty] }),
    //     channelName: new FormControl([],        { validators: [this.validation.validateFilterControlsOnEmpty], nonNullable: true }),
    //     codeStatuses: new FormControl([],       { validators: [this.validation.validateFilterControlsOnEmpty], nonNullable: true }),
    //     parentType: new FormControl([],         { validators: [this.validation.validateFilterControlsOnEmpty], nonNullable: true })
    //   }
    // );
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

};