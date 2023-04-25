

export class DateHelper {

    public static dateValid(date: Date | null): boolean{
        if (typeof date !== "object"){
            return false;
        }
        return date !== null && !Number.isNaN(date?.getTime());
    }

    public static getDiffInDays(dateFrom: Date | null, dateTo: Date | null): number | null {
        if (DateHelper.dateValid(dateFrom) && DateHelper.dateValid(dateTo)){
            const _MS_PER_DAY = 1000 * 60 * 60 * 24;
            const utc1 = Date.UTC(dateFrom!.getFullYear(), dateFrom!.getMonth(), dateFrom!.getDate(), dateFrom!.getHours(), dateFrom!.getMinutes(), dateFrom!.getSeconds());
            const utc2 = Date.UTC(dateTo!.getFullYear(), dateTo!.getMonth(), dateTo!.getDate(), dateTo!.getHours(), dateTo!.getMinutes(), dateTo!.getSeconds());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        }
        else{
            return null;
        }
    }

    public static validateDates(dateFrom: Date | null, dateTo: Date | null, maxDiffInDays?: number): DatesValidationReasons {
        if (!DateHelper.dateValid(dateFrom) || !DateHelper.dateValid(dateTo))
            return DatesValidationReasons.DatesInvalid;

        if (dateFrom!.getTime() > dateTo!.getTime())
            return DatesValidationReasons.DateFromMoreThanDateTo;

        if (maxDiffInDays && ((DateHelper.getDiffInDays(dateFrom, dateTo) ?? 0) > maxDiffInDays))
            return DatesValidationReasons.InvalidDatesDifference;

        return DatesValidationReasons.DatesValid;
    }

    public static convertDateSegmentToValidLength(...dateSegment: (number | string)[]): string[] {
        const result: string[] = dateSegment.map(segment => {
            const stringSegment = segment.toString();
            return stringSegment.length === 1 ? `0${stringSegment}`: stringSegment
        });
        return result;
    }

}

export enum DatesValidationReasons {
    DatesValid = "Даты корректны",
    DatesInvalid = "Недействительная «Дата/Время с» или «Дата/Время по»",
    DateFromMoreThanDateTo = "«Дата/Время с» превышает «Дата/Время по»",
    InvalidDatesDifference = "Невалидная разница между датами"
}