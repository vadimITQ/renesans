import { isBefore, isAfter, differenceInCalendarDays, format, isEqual } from 'date-fns';
import { ValidationMessage } from './types';
import { dateFormat } from '../components/controls/date-picker/date-picker.constants';

function parseDates(from: string | null, to: string | null): { fromDate: Date; toDate: Date } | null {
  if (!from || !to) {
    return null;
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);
  return { fromDate, toDate };
}

export function earlierThen(from: Date | null, to: Date | null, message?: string): ValidationMessage {
  if (!from || !to) {
    return null;
  }
  return !isEqual(from, to) && !isBefore(from, to)
    ? message || `Должно быть раньше, чем ${format(to, dateFormat)}`
    : null;
}

export function laterThen(from: Date | null, to: Date | null): ValidationMessage {
  if (!from || !to) {
    return null;
  }

  return !isAfter(to, from) ? `Должно быть позже, чем ${format(from, dateFormat)}` : null;
}

export function laterOrEqualThen(from: Date | null, to: Date | null): ValidationMessage {

  if (!from || !to) {
    return null;
  }

  return !isEqual(from, to) && !isAfter(to, from)
    ? `Не должно быть раньше, чем ${format(from, dateFormat)}`
    : null;
}

export function lessThanDateDiapason(fromDate: Date | null, toDate: Date | null, diapason: number, message?: string): ValidationMessage {
  return differenceInCalendarDays(toDate ?? 0, fromDate ?? 0) > diapason
    ? message
      ? message
      : `Диапазон дат не должен превышать ${diapason} дней.`
    : null;
}

export function required(value: unknown, message?: string): ValidationMessage {
  return !value ? message || 'Поле обязательно к заполнению' : null;
}

export function containInvalidSymbols(value: string): ValidationMessage {
  return /[^а-яА-Яa-zA-Z0-9\s\-_]/gi.test(value) ? 'Поле содержит недопустимые символы' : null;
}

export function invalidIpAddress(value: string): ValidationMessage {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g.test(
    value,
  )
    ? null
    : 'Неверный формат IP адреса';
}
