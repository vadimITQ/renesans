
import { ManualChecksFilter } from '../../../../../shared/models/manual-checks-models';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorMesssagesList } from 'src/app/shared/components/reactive-controls/global-error-messages';

export enum ValidationErrorsEnum {
  ValidateOnEmpty = "validateOnEmpty",
  ValidateOnEmptyControl = "validateOnEmptyControl",
  Required = "required",
  DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
  DatesRangeLimit = "datesRangeLimit",
  EmptyError = "emptyError"
}

@Injectable({
  providedIn: "root"
})
export class ManualChecksValidation {

  constructor(private toastService: ToastService){}

  readonly messages: ErrorMesssagesList = {
    [ValidationErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат",
    [ValidationErrorsEnum.ValidateOnEmptyControl]: "  ",
    [ValidationErrorsEnum.Required]: "Поле обязательно к заполнению",
    [ValidationErrorsEnum.DateFromMoreThanDateTo]: "«Дата/Время с» превышает «Дата/Время по»",
    [ValidationErrorsEnum.DatesRangeLimit]: "Диапазон дат не должен превышать 40 дней",
    [ValidationErrorsEnum.EmptyError]: "  "
  }

  validateEmpty(control: FormGroup<ManualChecksFilter>): ValidationErrors | null {
    if (!control){
      return null;
    }
    const noFilter: boolean = !control;
    const filterHasDates: boolean =  !!control.controls.dateTimeFrom.value || !!control.controls.dateTimeTo.value;
    const filterHasId: boolean = !!control.controls.paymentID.value || !!control.controls.applicationID.value || !!control.controls.idPH.value || !!control.controls.account.value;
    if ((control.touched || control.dirty) && (noFilter || (!filterHasDates && !filterHasId))){
        control.markAllAsTouched();
        Object.keys(control.controls)
          .forEach(key => {
            control.get(key)?.setErrors({ [ValidationErrorsEnum.EmptyError]: { value: true } });
          });
        return {
            [ValidationErrorsEnum.ValidateOnEmpty]: {
              value: true
            }
        };
    }
    else {
      Object.keys(control.controls)
          .forEach(key => {
            const _control = control.get(key);
            if (_control){
              const errors = Object.keys(_control.errors ?? {}).filter(error => error !== ValidationErrorsEnum.EmptyError);
              _control.setErrors({...errors})
            }
          });
    }
    return null;
  }

  validateDates(control: AbstractControl): ValidationErrors | null{
    const formGroup = control.parent;
    if (PEReactiveHelper.isFormGroup(formGroup)){
      const dateFrom = formGroup.controls["dateTimeFrom"];
      const dateTo = formGroup.controls["dateTimeTo"];
      const dateFromValue = dateFrom.value as Date;
      const dateToValue = dateTo.value as Date;
      const dateFromErrors = dateFrom.errors;
      const dateToErrors = dateTo.errors;
      const timeValueFrom = dateFromValue?.getTime() ?? 0;
      const timeValueTo = dateToValue?.getTime() ?? 0;
      const range: number = (timeValueFrom - timeValueTo) / (1000 * 60 * 60 * 24);

      if (!dateFromValue && !dateToValue){
        dateFrom.setErrors(null);
        dateTo.setErrors(null);
      }
      if (!dateFromValue){
        dateFrom.setErrors({...dateFromErrors, [ValidationErrorsEnum.Required]: true });
      }
      if (!dateToValue) {
        dateTo.setErrors({...dateToErrors, [ValidationErrorsEnum.Required]: true });
      }
      if (timeValueFrom > timeValueTo){
        dateFrom.setErrors({...dateFromErrors, [ValidationErrorsEnum.EmptyError]:  true })
        dateFrom.setErrors({...dateFromErrors, [ValidationErrorsEnum.DateFromMoreThanDateTo]: true});
      }
      if (range > 40){
        dateFrom.setErrors({...dateFromErrors, [ValidationErrorsEnum.EmptyError]: true })
        dateTo.setErrors({...dateToErrors, [ValidationErrorsEnum.DateFromMoreThanDateTo]: true  })
      }
      console.log(dateFrom.errors, dateTo.errors)
      dateFrom.markAsTouched();
      dateTo.markAsTouched();
    }
    return null;
  }
  
  testFormGroupValidaion(control: AbstractControl): ValidationErrors | null {
    console.log(control);
    return {
      validateOnEmpty: {
        value: true
      }
    };
  }

  validateFilterControlsOnEmpty(control: AbstractControl): ValidationErrors | null {
    const filter = control.parent as FormGroup<ManualChecksFilter>;
    if (!filter){
      return null;
    }
    const noFilter: boolean = !filter;
    const filterHasDates: boolean =  !!filter.controls.dateTimeFrom.value || !!filter.controls.dateTimeTo.value;
    const filterHasId: boolean = !!filter.controls.paymentID.value || !!filter.controls.applicationID.value || !!filter.controls.idPH.value || !!filter.controls.account.value;
    if ((filter.touched || filter.dirty) && (noFilter || (!filterHasDates && !filterHasId))){
        filter.markAllAsTouched();
        return {
            [ValidationErrorsEnum.ValidateOnEmpty]: {
              value: true
            }
        };
    }
    return null;
  }

  validateFilterOnEmpty(filter: FormGroup<ManualChecksFilter>): ValidationErrors | null {
    const noFilter: boolean = !filter;
    const filterHasDates: boolean =  !!filter.controls.dateTimeFrom.value || !!filter.controls.dateTimeTo.value;
    const filterHasId: boolean = !!filter.controls.paymentID.value || !!filter.controls.applicationID.value || !!filter.controls.idPH.value || !!filter.controls.account.value;
    if ((filter.touched || filter.dirty) && (noFilter || (!filterHasDates && !filterHasId))){
        filter.markAllAsTouched();
        return {
            [ValidationErrorsEnum.ValidateOnEmpty]: {
              value: true
            }
        };
    }
    return null;
  }
  
  validateControlOnEmpty(control: AbstractControl): ValidationErrors | null {
    let hasValue: boolean = false;
    const value = control.value;
    switch(typeof value){
      case("bigint"):
      case("boolean"):
      case("number"):
      case("string"):
      case("symbol"): {
        hasValue = !!value;
        break;
      }
      case("undefined"): {
        hasValue = false;
        break;
      }
      case("object"): {
        const isArray = Array.isArray(value);
        if (isArray){
          hasValue = value?.length > 0 ?? false;
        }
        else {
          hasValue = !!value && Object.keys(value).length > 0;
        }
      }
    }
    const parentValid = !!control.parent?.valid;
    const parentErrors = control.parent?.errors ?? {} as ValidationErrors;
    const parentHasValidateOnEmptyError = !!parentErrors["validateOnEmpty"]?.value;
    console.log(hasValue, parentValid, parentHasValidateOnEmptyError)
    if (!hasValue && !parentValid && parentHasValidateOnEmptyError){
      return {
        [ValidationErrorsEnum.ValidateOnEmptyControl]: { 
          value: true
        }
      }
    }
    return null;
  }

  validateDateTimeFrom(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (PEReactiveHelper.isFormGroup(formGroup)){
      const dateTimeFromControl = formGroup.controls["dateTimeFrom"];
      const dateTimeToControl = formGroup.controls["dateTimeTo"];
      const dateTimeFrom = dateTimeFromControl.value as Date | null;
      const dateTimeTo = dateTimeToControl.value as Date | null;
      const timeFrom : number = dateTimeFrom?.getTime() ?? 0;
      const timeTo : number = dateTimeTo?.getTime() ?? 0;
      const timeToIsEmpty = timeTo === 0;

      if (!dateTimeFrom && !dateTimeTo) {
        console.log(formGroup);
        return null;
      }

      if (!dateTimeFrom && !!dateTimeTo){
        return {
          [ValidationErrorsEnum.Required]: { value: true }
        };
      }

      if (timeFrom > timeTo && !timeToIsEmpty){
        return {
          [ValidationErrorsEnum.DateFromMoreThanDateTo]: { value: true }
        };
      }
  
    }
    return null;
  }
  
  validateDateTimeTo(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (PEReactiveHelper.isFormGroup(formGroup)) {
      const dateTimeFromControl = formGroup.controls["dateTimeFrom"];
      const dateTimeToControl = formGroup.controls["dateTimeTo"];
      const dateTimeFrom = dateTimeFromControl.value as Date | null;
      const dateTimeTo = dateTimeToControl.value as Date | null;
      const timeFrom: number = dateTimeFrom?.getTime() ?? 0;
      const timeTo: number = dateTimeTo?.getTime() ?? 0;
      const range: number = (timeTo - timeFrom) / (1000 * 60 * 60 * 24);
      const timeFromIsEmpty = timeFrom === 0;

      if (!dateTimeFrom && !dateTimeTo) {
        console.log(formGroup);
        return null;
      }

      if (!dateTimeTo && !!dateTimeFrom) {
        return {
          [ValidationErrorsEnum.Required]: { value: true }
        };
      }
  
      if (range > 40 && !timeFromIsEmpty) {
        return {
          [ValidationErrorsEnum.DatesRangeLimit]: { value: true }
        }
      }
      
    }
    return null;
  }
  
}

// export function validateFilter(filter: ISearchPaymentFilters): { success: boolean, validationMessage: ValidationMessage } {
//     const noFilter: boolean = !filter;
//     const filterHasDates: boolean =  !!DatePickerHelper.convertToDate(filter.dateTimeFrom) && !!DatePickerHelper.convertToDate(filter.dateTimeTo);
//     const filterHasId: boolean = !!filter.paymentID || !!filter.applicationID || !!filter.idPH || !!filter.account;
//     if (noFilter || (!filterHasDates && !filterHasId)){
//         return {
//             success: false,
//             validationMessage: "Не указаны необходимые параметры поиска"
//         };
//     }
//     if (filterHasDates){
//       const [dateFrom, dateTo] = [
//         DatePickerHelper.convertToDate(filter.dateTimeFrom),
//         DatePickerHelper.convertToDate(filter.dateTimeTo)
//       ];
//       switch (DateHelper.validateDates(dateFrom, dateTo, 40)) {
//         case(DatesValidationReasons.DateFromMoreThanDateTo): {
//             return {
//                 success: false,
//                 validationMessage: "«Дата/Время с» превышает «Дата/Время по»"
//             };
//         }
//         case(DatesValidationReasons.InvalidDatesDifference): {
//             return {
//                 success: false,
//                 validationMessage: "Диапазон дат не должен превышать 40 дней"
//             };
//         }
//       }
//     }
//     return {
//         success: true,
//         validationMessage: "Валидация прошла успешно"
//     }
// }

// export function validateDates(dateFrom: string | null, dateTo: string | null): Validation {
//     let validations: Validation = {
//         dateFromValidation: null,
//         dateToValidation: null
//     };
//     if (!dateFrom && !!dateTo){
//       validations["dateFromValidation"] = "Поле обязательно к заполнению";
//     }
//     if (!dateTo && !!dateFrom){
//       validations["dateToValidation"] = "Поле обязательно к заполнению";  
//     }
//     if (!DatePickerHelper.dateValid(dateFrom)){
//       validations["dateFromValidation"] = "Недействительная дата";
//     }
//     if (!DatePickerHelper.dateValid(dateTo)){
//       validations["dateToValidation"] = "Недействительная дата";
//     }
//     const [_dateFrom, _dateTo] = [
//       DatePickerHelper.convertToDate(dateFrom),
//       DatePickerHelper.convertToDate(dateTo)
//     ];
//     switch(DateHelper.validateDates(_dateFrom, _dateTo, 40)) {
//       case(DatesValidationReasons.DateFromMoreThanDateTo): {
//         validations["dateFromValidation"] = "«Дата/Время с» превышает «Дата/Время по»";
//         break;
//       }
//       case(DatesValidationReasons.InvalidDatesDifference): {
//         validations["dateToValidation"] = "Диапазон дат не должен превышать 40 дней";
//         break;
//       }
//       case(DatesValidationReasons.DatesValid): {
//         validations["dateFromValidation"] = null;
//         validations["dateToValidation"] = null;
//         break;
//       }
//     };
//     return validations;
// }