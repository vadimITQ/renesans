import { isBefore, isAfter, differenceInCalendarDays, format, isEqual } from 'date-fns';
import { ValidationMessage } from './types';
import { dateFormat } from '../components/controls/date-picker/date-picker.constants';
import { DatePickerHelper } from '../components/controls/date-picker/date-picker-helper';

function parseDates(from: string | null, to: string | null): { fromDate: Date; toDate: Date } | null {
  if (!from || !to) {
    return null;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  return { fromDate, toDate };
}

export function earlierThen(from: string | null, to: string | null): ValidationMessage {
  const parsedFrom = DatePickerHelper.convertToDate(from);
  const parsedTo = DatePickerHelper.convertToDate(to);

  if (!parsedFrom || !parsedTo) {
    return null;
  }

  return !isBefore(parsedFrom, parsedTo) ? `Должно быть раньше, чем ${format(parsedTo, dateFormat)}` : null;
}

export function laterThen(from: string | null, to: string | null): ValidationMessage {
  const parsedFrom = DatePickerHelper.convertToDate(from);
  const parsedTo = DatePickerHelper.convertToDate(to);

  if (!parsedFrom || !parsedTo) {
    return null;
  }
  
  return !isAfter(parsedTo, parsedFrom) ? `Должно быть позже, чем ${format(parsedFrom, dateFormat)}` : null;
}

export function laterOrEqualThen(from: string | null, to: string | null): ValidationMessage {
  const parsedFrom = DatePickerHelper.convertToDate(from);
  const parsedTo = DatePickerHelper.convertToDate(to);

  if (!parsedFrom || !parsedTo){
    return null;
  }

  return !isEqual(parsedFrom, parsedTo) && !isAfter(parsedTo, parsedFrom) ? `Не должно быть раньше, чем ${ format(parsedFrom, dateFormat) }` : null;

}

export function lessThanDateDiapason(from: string | null, to: string | null, diapason: number): ValidationMessage {
  const parsedDates = [DatePickerHelper.convertToDate(from), DatePickerHelper.convertToDate(to)];

  if (!parsedDates) {
    return null;
  }

  const [fromDate, toDate] = parsedDates;
  return differenceInCalendarDays(toDate ?? 0, fromDate ?? 0) > diapason ? `Диапазон дат не должен превышать ${diapason} дней.` : null;
}

export function required(value: unknown): ValidationMessage {
  return !value ? 'Поле обязательно к заполнению' : null;
}
