
import { Injectable } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { IAmlCheckFiltersForm } from "./aml-check-filters.types";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { GlobalReactiveErrorsEnum } from "src/app/shared/components/reactive-controls/global-error-messages";

export enum ValidationErrorsEnum {
    AmlCheckFilterNoValid = "amlCheckFilterNoValid"
}

@Injectable({
    providedIn: "root"
})
export class AmlCheckFilterValidation {

    constructor(){}

    validateFilter(filter: FormGroup<IAmlCheckFiltersForm>, calledBySearchButton?: boolean): ValidationErrors | null {

        filter.markAllAsTouched();
    
        PEReactiveHelper.clearErrors(filter);
    
        PEGlobalValidators.validateDates(filter);
        
        if (calledBySearchButton) {
          this.validateOnEmpty(filter);
        }
    
        return null;

    }

    validateOnEmpty(filter: FormGroup<IAmlCheckFiltersForm>) {

        const { applicationID, applicationStatus, dateTimeFrom, dateTimeTo, onlyExpired, paymentID } = filter.controls;

        const validateOnEmpty = !!applicationID.value || !!applicationStatus.value.length || !!dateTimeFrom.value || !!dateTimeTo.value || !!onlyExpired.value || !!paymentID.value;

        if (!validateOnEmpty) {
            Object.keys(filter.controls).forEach(k => {
                filter.get(k)?.setErrors({ [GlobalReactiveErrorsEnum.EmptyError]: true });
            });
            filter.setErrors({ 
                [ValidationErrorsEnum.AmlCheckFilterNoValid]: true,
                [GlobalReactiveErrorsEnum.ValidateOnEmpty]: true
            });
        }

    }

}