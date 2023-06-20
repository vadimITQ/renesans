
import { ErrorMesssagesList, GlobalReactiveErrorsEnum } from "src/app/shared/components/reactive-controls/global-error-messages";
import { AntiFraudCheckFilterForm } from "./anti-fraud-checks-filter.types";
import { Injectable } from "@angular/core";
import { globalMessages } from "src/app/shared/components/reactive-controls/global-error-messages";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";

export enum ValidationErrorsEnum {
    AntiFraudChecksFilterNoValid = "bankOpsCheckFilterNoValid"
}

@Injectable({
    providedIn: 'root'
})
export class AntiFraudChecksValidation {

    readonly messages: ErrorMesssagesList = {
      ...globalMessages.datesValidation,
      ...globalMessages.formValidations,
      [ValidationErrorsEnum.AntiFraudChecksFilterNoValid]: "  "
    }

    public validateFilter(group: FormGroup<AntiFraudCheckFilterForm>, calledBySearchButton: boolean = false): ValidationErrors | null {
      
        group.markAllAsTouched();
    
        PEReactiveHelper.clearErrors(group);
    
        PEGlobalValidators.validateDates(group);
        
        if (calledBySearchButton) {
          this.validateOnEmpty(group);
        }
    
        return null;
    
    }

    public validateOnEmpty(group: FormGroup<AntiFraudCheckFilterForm>): void {
        const { 
            IdPE,
            applicationId,
            dateTimeFrom,
            dateTimeTo
        } = group.controls;

        const emptyValidation = [
            IdPE.value,
            applicationId.value,
            dateTimeFrom.value,
            dateTimeTo.value
        ].every(v => !v);
        
        if ((group.touched || group.dirty) && emptyValidation){
          Object.keys(group.controls).forEach(key => {
            group.get(key)?.setErrors({ [GlobalReactiveErrorsEnum.EmptyError]: true });
          })
          group.setErrors(
            {
              [ValidationErrorsEnum.AntiFraudChecksFilterNoValid]: true,
              [GlobalReactiveErrorsEnum.ValidateOnEmpty]: true
            }
          );
        }
    }

}