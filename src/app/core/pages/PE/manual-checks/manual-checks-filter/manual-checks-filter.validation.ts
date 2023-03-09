
import { ManualChecksFilter } from '../../../../../shared/models/manual-checks-models';
import { DatePickerHelper } from '../../../../../shared/components/controls/date-picker/date-picker-helper';
import { DateHelper, DatesValidationReasons } from '../../../../../shared/classes/date-helper';
import { Validation, ValidationMessage } from 'src/app/shared/validation/types';

export function validateFilter(filter: ManualChecksFilter): { success: boolean, validationMessage: ValidationMessage } {
    const noFilter: boolean = !filter;
    const filterHasDates: boolean =  !!DatePickerHelper.convertToDate(filter.dateFrom) && !!DatePickerHelper.convertToDate(filter.dateTo);
    const filterHasId: boolean = !!filter.paymentID || !!filter.applicationID || !!filter.paymentHubPaymentId || !!filter.account;
    if (noFilter || (!filterHasDates && !filterHasId)){
        return {
            success: false,
            validationMessage: "Не указаны необходимые параметры поиска"
        };
    }
    if (filterHasDates){
      const [dateFrom, dateTo] = [
        DatePickerHelper.convertToDate(filter.dateFrom),
        DatePickerHelper.convertToDate(filter.dateTo)
      ];
      switch (DateHelper.validateDates(dateFrom, dateTo, 40)) {
        case(DatesValidationReasons.DateFromMoreThanDateTo): {
            return {
                success: false,
                validationMessage: "«Дата/Время с» превышает «Дата/Время по»"
            };
        }
        case(DatesValidationReasons.InvalidDatesDifference): {
            return {
                success: false,
                validationMessage: "Диапазон дат не должен превышать 40 дней"
            };
        }
      }
    }
    return {
        success: true,
        validationMessage: "Валидация прошла успешно"
    }
}

export function validateDates(dateFrom: string | null, dateTo: string | null): Validation {
    let validations: Validation = {
        dateFromValidation: null,
        dateToValidation: null
    };
    if (!DatePickerHelper.dateValid(dateFrom)){
      validations["dateFromValidation"] = "Недействительная дата";   
    }
    if (!DatePickerHelper.dateValid(dateTo)){
      validations["dateToValidation"] = "Недействительная дата";
    }
    const [_dateFrom, _dateTo] = [
      DatePickerHelper.convertToDate(dateFrom),
      DatePickerHelper.convertToDate(dateTo)
    ];
    switch(DateHelper.validateDates(_dateFrom, _dateTo, 40)) {
      case(DatesValidationReasons.DateFromMoreThanDateTo): {
        validations["dateFromValidation"] = "«Дата/Время с» превышает «Дата/Время по»"; 
        break;
      }
      case(DatesValidationReasons.InvalidDatesDifference): {
        validations["dateToValidation"] = "Диапазон дат не должен превышать 40 дней";
        break;
      }
      case(DatesValidationReasons.DatesValid): {
        validations["dateFromValidation"] = null;
        validations["dateToValidation"] = null;
        break;
      }
    };
    return validations;
}

export function validateFilterOnEmpty(filter: ManualChecksFilter): Validation | null {
  const noFilter: boolean = !filter;
    const filterHasDates: boolean =  !!DatePickerHelper.convertToDate(filter.dateFrom) && !!DatePickerHelper.convertToDate(filter.dateTo);
    const filterHasId: boolean = !!filter.paymentID || !!filter.applicationID || !!filter.paymentHubPaymentId || !!filter.account;
    if (noFilter || (!filterHasDates && !filterHasId)){
        return {
            dateFrom: "",
            dateTo: "",
            paymentID: "",
            applicationID: "",
            paymentHubPaymentId: "",
            account: ""
        };
    }
    return null;
}