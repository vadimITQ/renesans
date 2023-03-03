import { isBefore, isAfter, parse } from 'date-fns';
import { ValidationMessage } from './types';
import { dateFormat, dateFormatWithTime } from '../components/controls/date-picker/date-picker.constants';

export function earlierThen(from: string | null, to: string | null): ValidationMessage {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, from.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  const toDate = parse(to, to.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  return !isBefore(fromDate, toDate) ? `Должно быть раньше, чем ${to}` : null;
}

export function laterThen(from: string | null, to: string | null): ValidationMessage {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, from.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  const toDate = parse(to, to.includes(' ') ? dateFormatWithTime : dateFormat, new Date());
  return !isAfter(toDate, fromDate) ? `Должно быть позже, чем ${from}` : null;
}
