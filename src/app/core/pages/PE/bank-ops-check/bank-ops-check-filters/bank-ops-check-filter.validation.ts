import { Injectable } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { ErrorMesssagesList, GlobalReactiveErrorsEnum, globalMessages } from "src/app/shared/components/reactive-controls/global-error-messages";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { IBankOpsCheckFilterForm } from "./bank-ops-check-filters.types";

export enum ValidationErrorsEnum {
    ValidateOnEmpty = "validateOnEmpty",
    BankOpsCheckFilterNoValid = "bankOpsCheckFilterNoValid"
}

@Injectable({
    providedIn: 'root'
})
export class BankOpsCheckFilterValidation {

    constructor(){}

    readonly messages: ErrorMesssagesList = {
      ...globalMessages.datesValidation,
      [ValidationErrorsEnum.BankOpsCheckFilterNoValid]: " ",
      [ValidationErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат"
    }

    public validateFilter(group: FormGroup<IBankOpsCheckFilterForm>, triggeredBySubmitButton: boolean = false): ValidationErrors | null {
      
        group.markAllAsTouched();
    
        PEReactiveHelper.clearErrors(group);
    
        PEGlobalValidators.validateDates(group);
        
        if (triggeredBySubmitButton) {
          this.validateOnEmpty(group);
        }
    
        return null;
    
    }

    private validateOnEmpty(group: FormGroup<IBankOpsCheckFilterForm>) {
      if (!group){
        return;
      }
      const {
        paymentID,
        applicationID,
        dateTimeFrom,
        dateTimeTo,
        applicationStatus
      } = group.controls;

      const emptyValidation = [
        paymentID.value, applicationID.value, dateTimeFrom.value, dateTimeTo.value, applicationStatus.value?.length
      ].every(v => !v);

      if ((group.touched || group.dirty) && emptyValidation){
        Object.keys(group.controls).forEach(key => {
          group.get(key)?.setErrors({ [GlobalReactiveErrorsEnum.EmptyError]: true });
        })
        group.setErrors(
          {
            [ValidationErrorsEnum.BankOpsCheckFilterNoValid]: true,
            [ValidationErrorsEnum.ValidateOnEmpty]: true
          }
        );
      }
    }

}