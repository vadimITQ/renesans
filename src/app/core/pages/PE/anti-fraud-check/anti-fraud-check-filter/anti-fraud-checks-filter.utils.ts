
import { subDays } from "date-fns";
import { AntiFraudCheckFilterForm } from "./anti-fraud-checks-filter.types";
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AntiFraudChecksValidation, ValidationErrorsEnum } from "./anti-fraud-checks-filter.validation";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { ToastService } from "src/app/shared/services/toast.service";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";
import { IGetApplicationsListPayload } from "../../../../../shared/types/get-applications-list";
import { antiFraudApplicationStatuses } from "./anti-fraud-checks-filter.constants";

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
        const manualAntiFraudCheckStatusList: IMultiSelectData[] = [antiFraudApplicationStatuses[0]];
        return this.fb.group<AntiFraudCheckFilterForm>({
            paymentID: new FormControl(""),
            applicationID: new FormControl(""),
            dateTimeFrom: new FormControl(dateFrom),
            dateTimeTo: new FormControl(dateTo),
            manualAntiFraudCheckStatusList: new FormControl(manualAntiFraudCheckStatusList, { nonNullable: true }),
            agedOnly: new FormControl(false, { nonNullable: true }),
        }, {
            updateOn : 'change',
            validators: (group) => this.validation.validateFilter(group as FormGroup<AntiFraudCheckFilterForm>)
        });
    }

    prepareAntiFraudFilters(group: FormGroup<AntiFraudCheckFilterForm>): IGetApplicationsListPayload {
      const { 
        dateTimeFrom, 
        dateTimeTo, 
        paymentID, 
        applicationID, 
        manualAntiFraudCheckStatusList, 
        agedOnly 
      } = group.controls;
      return {
        dateTimeFrom: !!dateTimeFrom.value ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.value.toISOString()) ?? undefined : undefined,
        dateTimeTo: !!dateTimeTo.value ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.value.toISOString()) ?? undefined : undefined,
        paymentID: !!paymentID.value ? paymentID.value : undefined,
        applicationID: !!applicationID.value ? applicationID.value : undefined,
        manualAntiFraudCheckStatusList: !!manualAntiFraudCheckStatusList.value ? manualAntiFraudCheckStatusList.value.length > 0 ? manualAntiFraudCheckStatusList.value.map(v => v.value) : undefined: undefined,
        agedOnly: !!agedOnly.value ? agedOnly.value: undefined,
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
