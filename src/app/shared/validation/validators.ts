import { isBefore, isAfter, parse } from 'date-fns';
import { ValidationMessage } from './types';

const formatString = 'dd/MM/yy';

export function earlierThen(from: string | null, to: string | null): ValidationMessage {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, formatString, new Date());
  const toDate = parse(to, formatString, new Date());
  return !isBefore(fromDate, toDate) ? `Должно быть раньше, чем ${to}` : null;
}

export function laterThen(from: string | null, to: string | null): ValidationMessage {
  if (!from || !to) {
    return null;
  }

  const fromDate = parse(from, formatString, new Date());
  const toDate = parse(to, formatString, new Date());
  return !isAfter(toDate, fromDate) ? `Должно быть позже, чем ${from}` : null;
}
