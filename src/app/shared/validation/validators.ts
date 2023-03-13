import { isBefore, isAfter, parse, differenceInCalendarDays } from 'date-fns';
import { ValidationMessage } from './types';
import { dateFormat, dateFormatWithTime } from '../components/controls/date-picker/date-picker.constants';

function parseDates(from: string | null, to: string | null): { fromDate: Date; toDate: Date } | null {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, from.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  const toDate = parse(to, to.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  return { fromDate, toDate };
}

export function earlierThen(from: string | null, to: string | null): ValidationMessage {
  const parsedDates = parseDates(from, to);

  if (!parsedDates) {
    return null;
  }

  const { fromDate, toDate } = parsedDates;
  return !isBefore(fromDate, toDate) ? `Должно быть раньше, чем ${to}` : null;
}

export function laterThen(from: string | null, to: string | null): ValidationMessage {
  const parsedDates = parseDates(from, to);

  if (!parsedDates) {
    return null;
  }

  const { fromDate, toDate } = parsedDates;
  return !isAfter(toDate, fromDate) ? `Должно быть позже, чем ${from}` : null;
}

export function lessThanDateDiapason(from: string | null, to: string | null, diapason: number): ValidationMessage {
  const parsedDates = parseDates(from, to);

  if (!parsedDates) {
    return null;
  }

  const { fromDate, toDate } = parsedDates;
  return differenceInCalendarDays(toDate, fromDate) > diapason ? `Диапозон дат не должен превышать ${diapason} дней.` : null;
}

export function required(value: unknown): ValidationMessage {
  return !value ? 'Поле обязательно к заполнению' : null;
}
