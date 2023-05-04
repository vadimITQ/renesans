
import { ManualChecksFilter } from '../../../../../shared/models/manual-checks-models';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorMesssagesList } from 'src/app/shared/components/reactive-controls/global-error-messages';

@Injectable()
export class ManualChecksValidation {

  constructor(private toastService: ToastService){}

  readonly messages: ErrorMesssagesList = {
    validateOnEmpty: "Заполните хотя бы одно из полей фильтров или укажите интервал дат",
    validateOnEmptyControl: " ",
    required: "Поле обязательно к заполнению",
    dateFromMoreThanDateTo: "«Дата/Время с» превышает «Дата/Время по»",
    datesRangeLimit: "Диапазон дат не должен превышать 40 дней"
  }
   
  validateFilterOnEmpty(filter: FormGroup<ManualChecksFilter>): ValidationErrors | null {
    const noFilter: boolean = !filter;
    const filterHasDates: boolean =  !!filter.controls.dateTimeFrom.value || !!filter.controls.dateTimeTo.value;
    const filterHasId: boolean = !!filter.controls.paymentID.value || !!filter.controls.applicationID.value || !!filter.controls.idPH.value || !!filter.controls.account.value;
    if (noFilter || (!filterHasDates && !filterHasId)){
        this.toastService.showErrorToast('Заполните хотя бы одно из полей фильтров или укажите интервал дат');
        return {
            validateOnEmpty: {
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
        hasValue = value !== null && value !== undefined;
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
          hasValue = value !== null && value !== undefined;
        }
      }
    }
    const parentValid = !!control.parent?.valid;
    const parentErrors = control.parent?.errors ?? {} as ValidationErrors;
    const parentHasValidateOnEmptyError = parentErrors["validateOnEmpty"]?.value;
    if (!hasValue && !parentValid && parentHasValidateOnEmptyError){
      return {
        validateOnEmptyControl: { 
          value: true
        }
      }
    }
    return null;
  }
  
  validateDateTimeFrom(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (PEReactiveHelper.isFormGroup(formGroup)){
      const dateTimeFrom = formGroup.controls["dateTimeFrom"].value as Date | null;
      const dateTimeTo = formGroup.controls["dateTimeTo"].value as Date | null;
      const timeFrom : number = dateTimeFrom?.getTime() ?? 0;
      const timeTo : number = dateTimeTo?.getTime() ?? 0;
  
      if (!dateTimeFrom){
        return {
          required: { value: true }
        };
      }
  
      if (timeFrom > timeTo){
        return {
          dateFromMoreThanDateTo: { value: true }
        };
      }
  
    }
    return null;
  }
  
  validateDateTimeTo(control: AbstractControl): ValidationErrors | null {
    const formGroup = control.parent;
    if (PEReactiveHelper.isFormGroup(formGroup)) {
      const dateTimeFrom = formGroup.controls["dateTimeFrom"].value as Date | null;
      const dateTimeTo = formGroup.controls["dateTimeTo"].value as Date | null;
      const timeFrom: number = dateTimeFrom?.getTime() ?? 0;
      const timeTo: number = dateTimeTo?.getTime() ?? 0;
      const range: number = (timeTo - timeFrom) / (1000 * 60 * 60 * 24);
  
      if (!dateTimeTo) {
        return {
          required: { value: true }
        };
      }
  
      if (range > 40) {
        return {
          datesRangeLimit: { value: true }
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