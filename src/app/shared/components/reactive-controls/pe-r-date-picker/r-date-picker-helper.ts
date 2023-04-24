
import { FormControl } from "@angular/forms";

export class RDatePickerHelper {
    static getISODate(dateControl: FormControl, timeControl: FormControl): string | null {
        const date = dateControl.value as Date;
        const time = timeControl.value as Date;
        if (!date){
            return null;
        }
        if (!time){
            date.setUTCHours(0, 0, 0, 1);
            return date.toISOString();
        }
        const dateISO = date?.toISOString()?.split("T")[0] ?? null;
        const timeISO = time?.toISOString()?.split("T")[1] ?? null;
        return `${dateISO}T${timeISO}`;
    }
}