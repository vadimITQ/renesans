
import { ManualChecksFilter } from '../../../../../shared/models/manual-checks-models';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { Injectable } from '@angular/core';
import { ErrorMesssagesList } from 'src/app/shared/components/reactive-controls/global-error-messages';
import { PEGlobalValidators } from 'src/app/shared/components/reactive-controls/validations';

export enum ValidationErrorsEnum {
  ValidateOnEmpty = "validateOnEmpty",
  ValidateOnEmptyControl = "validateOnEmptyControl",
  Required = "required",
  DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
  DatesRangeLimit = "datesRangeLimit",
  EmptyError = "emptyError",
  ManualChecksFormNoValid = "manualChecksFormNoValid"
}

@Injectable({
  providedIn: "root"
})
export class ManualChecksValidation {

  constructor(){}

  readonly messages: ErrorMesssagesList = {
    [ValidationErrorsEnum.ManualChecksFormNoValid]: " ",
    [ValidationErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат",
    [ValidationErrorsEnum.ValidateOnEmptyControl]: "  ",
    [ValidationErrorsEnum.Required]: "Поле обязательно к заполнению",
    [ValidationErrorsEnum.DateFromMoreThanDateTo]: "«Дата/Время с» превышает «Дата/Время по»",
    [ValidationErrorsEnum.DatesRangeLimit]: "Диапазон дат не должен превышать 40 дней",
    [ValidationErrorsEnum.EmptyError]: "  "
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

  public validateOnEmpty(group: FormGroup<ManualChecksFilter>): void {
    if (!group){
      return;
    }
    const noFilter: boolean = !group;
    const filterHasDates: boolean =  !!group.controls.dateTimeFrom.value || !!group.controls.dateTimeTo.value;
    const filterHasId: boolean = !!group.controls.paymentID.value || !!group.controls.applicationID.value || !!group.controls.idPH.value || !!group.controls.account.value;
    if ((group.touched || group.dirty) && (noFilter || (!filterHasDates && !filterHasId))){
      Object.keys(group.controls).forEach(key => {
        group.get(key)?.setErrors({ [ValidationErrorsEnum.EmptyError]: true });
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