
import { subDays } from "date-fns";
import { AntiFraudCheckFilter, AntiFraudCheckFilterForm } from "./anti-fraud-checks-filter.types";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AntiFraudChecksValidation, ValidationErrorsEnum } from "./anti-fraud-checks-filter.validation";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ToastService } from "src/app/shared/services/toast.service";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { IMultiCheckboxData } from "src/app/shared/components/reactive-controls/pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component";

@Injectable({
    providedIn: 'root'
})
export class AntiFraudChecksFilterUtils {

    constructor(
        private fb: FormBuilder,
        private validation: AntiFraudChecksValidation,
        private toast: ToastService
    ){}

    public createDefaultFilter(): FormGroup<AntiFraudCheckFilterForm> {
        const dateTo = new Date();
        const dateFrom = subDays(dateTo, 3);
        return this.fb.group<AntiFraudCheckFilterForm>({
            IdPE: new FormControl(""),
            applicationId: new FormControl(""),
            dateTimeFrom: new FormControl(dateFrom),
            dateTimeTo: new FormControl(dateTo),
            applicationStatus: new FormControl([], { nonNullable: true }),
            onlyExpired: new FormControl(false, { nonNullable: true }),
        }, {
            updateOn : 'change',
            validators: (group) => this.validation.validateFilter(group as FormGroup<AntiFraudCheckFilterForm>)
        });
    }

    public prepareFilterValues(filter: FormGroup<AntiFraudCheckFilterForm>): AntiFraudCheckFilter {

        const { 
            IdPE,
            applicationId,
            dateTimeFrom,
            dateTimeTo,
            applicationStatus,
            onlyExpired
        } = filter.controls;

        return {
           IdPE: IdPE.value,
           applicationId: applicationId.value,
           dateFrom: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value?.toISOString() ?? ""),
           dateTo: DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value?.toISOString() ?? ""),
           applicationStatus: applicationStatus.value,
           onlyExpired: onlyExpired.value,
        };

    }

    public showErrorMessages(filter: FormGroup<AntiFraudCheckFilterForm>): void {
    
        const message = PEGlobalValidators.getErrorMessage(filter);
        
        if (!!message){
          this.toast.showErrorToast(
            message
          );
          return;
        }
        
      }

}