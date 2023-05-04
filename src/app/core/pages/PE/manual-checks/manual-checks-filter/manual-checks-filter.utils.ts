
import { sub } from "date-fns";
import { ManualChecksFilter, ManualChecksProps } from '../../../../../shared/models/manual-checks-models';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { ISearchPaymentsFiltersPayload } from "src/app/core/services/search-payment/types";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ManualChecksValidation } from "./manual-checks-filter.validation";

@Injectable()
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
    return this.fb.group<ManualChecksFilter>({
      paymentID: new FormControl("",      { validators: [this.validation.validateControlOnEmpty] }),
      applicationID: new FormControl("",  { validators: [this.validation.validateControlOnEmpty] }),
      idPH: new FormControl("",           { validators: [this.validation.validateControlOnEmpty] }),
      dateTimeFrom: new FormControl(null, { validators: [this.validation.validateControlOnEmpty, this.validation.validateDateTimeFrom] }),
      dateTimeTo: new FormControl(null,   { validators: [this.validation.validateControlOnEmpty, this.validation.validateDateTimeTo] }),
      account: new FormControl("",        { validators: [this.validation.validateControlOnEmpty] }),
      channelName: new FormControl([],    { validators: [this.validation.validateControlOnEmpty], nonNullable: true }),
      codeStatuses: new FormControl([],   { validators: [this.validation.validateControlOnEmpty], nonNullable: true }),
      parentType: new FormControl([],     { validators: [this.validation.validateControlOnEmpty], nonNullable: true })
    },
      {
        validators: [() => this.validation.validateFilterOnEmpty]
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

};