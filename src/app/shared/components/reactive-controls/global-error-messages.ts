import { format } from "date-fns";
import { dateFormat } from "../controls/date-picker/date-picker.constants";

export interface ErrorMesssagesList {
    [key: string]: string;
}

export enum GlobalReactiveErrorsEnum {
  FormNoValid = "formNoValid",
  Required = "required",
  EmptyError = "emptyError",
  DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
  DatesRangeLimit40 = "datesRangeLimit40",
  PlannedDateLessToday = "plannedDateMoreToday",
  ValidateOnEmpty = "validateOnEmpty"
}

const globalMessages_datesValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.DateFromMoreThanDateTo]: "«Дата/Время с» превышает «Дата/Время по»",
  [GlobalReactiveErrorsEnum.DatesRangeLimit40]: "Диапазон дат не должен превышать 40 дней",
  [GlobalReactiveErrorsEnum.PlannedDateLessToday]: `Не должно быть раньше, чем ${format(new Date(), dateFormat)}`,
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_inputValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_multicheckboxValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_checkboxValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_multiselectValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_textareaValidation: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.Required]: "Поле обязательно к заполнению",
  [GlobalReactiveErrorsEnum.EmptyError]: "  "
}

const globalMessages_form: ErrorMesssagesList = {
  [GlobalReactiveErrorsEnum.FormNoValid]: "  ",
  [GlobalReactiveErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат"
}

export const globalMessages = {
    datesValidation: globalMessages_datesValidation,
    inputValidation: globalMessages_inputValidation,
    multicheckboxValidation: globalMessages_multicheckboxValidation,
    checkboxValidation: globalMessages_checkboxValidation,
    multiselectValidation: globalMessages_multiselectValidation,
    textareaValidation: globalMessages_textareaValidation,
    formValidations: globalMessages_form
};

