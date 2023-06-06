
export interface ErrorMesssagesList {
    [key: string]: string;
}

export enum GlobalReactiveErrorsEnum {
  FormGroupNoValid = "formGroupNoValid",
  Required = "required",
  EmptyError = "emptyError",
  DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
  DatesRangeLimit = "datesRangeLimit",
  PlannedDateNoValid = "plannedDateNoValid"
}

const globalMessages_datesValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.DateFromMoreThanDateTo]: "«Дата/Время с» превышает «Дата/Время по»",
  [GlobalReactiveErrorsEnum.DatesRangeLimit]: "Диапазон дат не должен превышать 40 дней",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

export const globalMessages = {
    datesValidation: globalMessages_datesValidation
}

