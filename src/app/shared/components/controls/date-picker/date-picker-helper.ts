import { DateHelper } from 'src/app/shared/classes/date-helper';
import {format, isValid, parse, parseISO} from "date-fns";

export class DatePickerHelper {
  public static convertToDate(datePickerDate: string | null): Date | null {
    if (!datePickerDate) {
      return null;
    }
    let result = new Date(datePickerDate);
    return Number.isNaN(result.getTime()) ? null : result;
  }

  public static dateValid(datePickerDate: string | null): boolean {
    if (datePickerDate) {
      const date: Date | null = this.convertToDate(datePickerDate);
      return date !== null && !Number.isNaN(date.getTime());
    } else {
      return true;
    }
  }

  public static convertToDatePicker(date: Date | null, withTime: boolean = true): string | null {
    if (!date || !DateHelper.dateValid(date)) return null;

    if (withTime) {
      return date.toISOString();
    } else {
      return date.toISOString().split('T')[0];
    }

    // let [ day, month, year, minutes, hours, seconds ] =

    // DateHelper.convertDateSegmentToValidLength(
    //     date.getDate(),
    //     date.getMonth() + 1,
    //     date.getFullYear(),
    //     date.getMinutes(),
    //     date.getHours(),
    //     date.getSeconds()
    // );

    // return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  public static convertToLocaleStringWithTimezone(isoDate: string): string {
    const dateValue = new Date(isoDate);

    const localeDateString = dateValue.toLocaleString('sv', { timeZoneName: 'short' });
    const [date, time, timezone] = localeDateString.split(' ');

    const timezoneWithSign = timezone.replace('GMT', '');
    const timezoneSign = timezoneWithSign.charAt(0);
    const timezoneValue = timezoneWithSign.replace(/[+-]/g, '');
    const fullTimezoneValue = +timezoneValue < 10 ? `0${timezoneValue}` : timezoneValue

        return `${date}T${time.substring(0,2).includes(':') ? `0${time}`: time}${timezoneSign}${fullTimezoneValue}:00`;
  }

  public static parseFromLocaleStringToDate(localeString: string | null):Date | null{
    const parsedDate = parseISO(localeString ?? '')

    if(!isValid(parsedDate)) {
      return null
    }
    return parsedDate
  }
}
