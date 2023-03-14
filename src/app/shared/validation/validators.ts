import { isBefore, isAfter, parse, differenceInCalendarDays, parseISO } from 'date-fns';
import { ValidationMessage } from './types';
import { dateFormat, dateFormatWithTime } from '../components/controls/date-picker/date-picker.constants';
import { DatePickerHelper } from '../components/controls/date-picker/date-picker-helper';

function parseDates(from: string | null, to: string | null): { fromDate: Date; toDate: Date } | null {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, from.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  const toDate = parse(to, to.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  return { fromDate, toDate };
}

export function earlierThen(from: string | null, to: string | null): ValidationMessage {
  const parsedDates = [DatePickerHelper.convertToDate(from), DatePickerHelper.convertToDate(to)];

  if (!parsedDates) {
    return null;
  }

  const [ fromDate, toDate ] = parsedDates;

  return !isBefore(fromDate ?? 0, toDate ?? 0) ? `Должно быть раньше, чем ${to}` : null;
}

export function laterThen(from: string | null, to: string | null): ValidationMessage {
  const parsedDates = [DatePickerHelper.convertToDate(from), DatePickerHelper.convertToDate(to)];

  if (!parsedDates) {
    return null;
  }

  const [ fromDate, toDate ] = parsedDates;
  return !isAfter(toDate ?? 0, fromDate ?? 0) ? `Должно быть позже, чем ${from}` : null;
}

export function lessThanDateDiapason(from: string | null, to: string | null, diapason: number): ValidationMessage {
  const parsedDates = [DatePickerHelper.convertToDate(from), DatePickerHelper.convertToDate(to)];

  if (!parsedDates) {
    return null;
  }

  const [ fromDate, toDate ] = parsedDates;
  return differenceInCalendarDays(toDate ?? 0, fromDate ?? 0) > diapason ? `Диапозон дат не должен превышать ${diapason} дней.` : null;
}

export function required(value: unknown): ValidationMessage {
  return !value ? 'Поле обязательно к заполнению' : null;
}
