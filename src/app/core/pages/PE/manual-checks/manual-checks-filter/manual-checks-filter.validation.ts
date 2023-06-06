
import { FormGroup, ValidationErrors } from '@angular/forms';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { Injectable } from '@angular/core';
import { ErrorMesssagesList, GlobalReactiveErrorsEnum } from 'src/app/shared/components/reactive-controls/global-error-messages';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';
import { ManualChecksFilter } from "./manual-checks-filter.types";
import { globalMessages } from "src/app/shared/components/reactive-controls/global-error-messages";

export enum ValidationErrorsEnum {
  ManualChecksFormNoValid = "manualChecksFormNoValid",
  ValidateOnEmpty = "validateOnEmpty",
  ValidateOnEmptyControl = "validateOnEmptyControl"
}

@Injectable({
  providedIn: "root"
})
export class ManualChecksValidation {

  constructor(){}

  readonly messages: ErrorMesssagesList = {
    ...globalMessages.datesValidation,
    [ValidationErrorsEnum.ManualChecksFormNoValid]: " ",
    [ValidationErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат",
    [ValidationErrorsEnum.ValidateOnEmptyControl]: "  ",
  }

  public validateFilter(group: FormGroup<ManualChecksFilter>, triggeredBySubmitButton: boolean = false): ValidationErrors | null {

    group.markAllAsTouched();

    PEReactiveHelper.clearErrors(group);

    PEGlobalValidators.validateDates(group);
    
    if (triggeredBySubmitButton) {
      this.validateOnEmpty(group);
    }

    return null;

  }

  private validateOnEmpty(group: FormGroup<ManualChecksFilter>): void {
    if (!group){
      return;
    }
    const noFilter: boolean = !group;
    const filterHasDates: boolean =  !!group.controls.dateTimeFrom.value || !!group.controls.dateTimeTo.value;
    const filterHasId: boolean = !!group.controls.paymentID.value || !!group.controls.applicationID.value || !!group.controls.idPH.value || !!group.controls.account.value;
    const filterHasSelections: boolean = !!group.controls.channelName.value.length || !!group.controls.codeStatuses.value.length || !!group.controls.parentType.value.length;
    if ((group.touched || group.dirty) && (noFilter || (!filterHasDates && !filterHasId && !filterHasSelections))){
      Object.keys(group.controls).forEach(key => {
        group.get(key)?.setErrors({ [GlobalReactiveErrorsEnum.EmptyError]: true });
      })
      group.setErrors(
        {
          [ValidationErrorsEnum.ManualChecksFormNoValid]: {
            value: true
          },
          [ValidationErrorsEnum.ValidateOnEmpty]: {
            value: true
          }
        }
      );
    }
  }

}