
import { FormGroup, ValidationErrors } from '@angular/forms';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { Injectable } from '@angular/core';
import { ErrorMesssagesList, GlobalReactiveErrorsEnum } from 'src/app/shared/components/reactive-controls/global-error-messages';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';
import { ManualChecksFilter } from "./manual-checks-filter.types";
import { globalMessages } from "src/app/shared/components/reactive-controls/global-error-messages";

export enum ValidationErrorsEnum {
  ManualChecksFormNoValid = "manualChecksFormNoValid"
}

@Injectable({
  providedIn: "root"
})
export class ManualChecksValidation {

  constructor(){}

  readonly messages: ErrorMesssagesList = {
    ...globalMessages.datesValidation,
    ...globalMessages.formValidations,
    [ValidationErrorsEnum.ManualChecksFormNoValid]: "  "
  }

  public validateFilter(group: FormGroup<ManualChecksFilter>, calledBySearchButton: boolean = false): ValidationErrors | null {

    group.markAllAsTouched();

    PEReactiveHelper.clearErrors(group);

    PEGlobalValidators.validateDates(group);
    
    if (calledBySearchButton) {
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
          [GlobalReactiveErrorsEnum.ValidateOnEmpty]: {
            value: true
          }
        }
      );
    }
  }

}
