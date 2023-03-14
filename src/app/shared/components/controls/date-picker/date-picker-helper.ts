import { DateHelper } from "src/app/shared/classes/date-helper";

export class DatePickerHelper {

    public static convertToDate(datePickerDate: string | null): Date | null {
        if (!datePickerDate){ return null; }
        let result = new Date(datePickerDate);
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

        return date.toISOString();

        // let [ day, month, year, minutes, hours, seconds ] = 

        // DatePickerHelper.convertDateSegmentToValidLength(
        //     date.getDate(),
        //     date.getMonth() + 1,
        //     date.getFullYear(),
        //     date.getMinutes(),
        //     date.getHours(),
        //     date.getSeconds()
        // );

        // return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // private static convertDateSegmentToValidLength(...dateSegment: (number | string)[]): string[] {
    //     const result: string[] = dateSegment.map(segment => {
    //         const stringSegment = segment.toString();
    //         return stringSegment.length === 1 ? `0${stringSegment}`: stringSegment
    //     });
    //     return result;
    // }
    
}