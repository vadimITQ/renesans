import { DateHelper } from "src/app/shared/classes/date-helper";

export class DatePickerHelper {
    public static convertToDate(datePickerDate: string | null): Date | null {
        if (!datePickerDate){ return null; }
        let [ _date, _time ] = datePickerDate.split(" ");
        let validDate = _date.split("/").reverse().join("-");
        let validTime = `T${ _time }:00`;
        let result = new Date(`${ validDate }${ validTime }`);
        return Number.isNaN(result.getTime()) ? null: result;
    }
    public static dateValid(datePickerDate: string | null): boolean{
        if (datePickerDate){
            const date: Date | null = this.convertToDate(datePickerDate);
            return date !== null && !Number.isNaN(date.getTime());
        }
        else{ 
            return true;
        }
    }
    public static convertToDatePicker(date: Date | null): string | null {
        if (!date || !DateHelper.dateValid(date))
            return null;
        let [ day, month, year, minutes, hours ] = [
            DatePickerHelper.convertDateSegmentToValidLength(date.getDate()),
            DatePickerHelper.convertDateSegmentToValidLength(date.getMonth() + 1),
            DatePickerHelper.convertDateSegmentToValidLength(date.getFullYear()),
            DatePickerHelper.convertDateSegmentToValidLength(date.getMinutes()),
            DatePickerHelper.convertDateSegmentToValidLength(date.getHours())
        ];
        day = day.length === 1 ? day = "0" + day: day;

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    private static convertDateSegmentToValidLength(dateSegment: number | string): string {
        const segment = dateSegment.toString();
        return segment.length === 1 ? `0${segment}`: segment;
    }
}