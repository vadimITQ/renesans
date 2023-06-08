
import { FormControl } from "@angular/forms";
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";
import { IMultiCheckboxData } from "src/app/shared/components/reactive-controls/pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component";

export interface AntiFraudCheckFilterForm {
    IdPE: FormControl<string | null>;
    applicationId: FormControl<string | null>;
    dateTimeFrom: FormControl<Date | null>;
    dateTimeTo: FormControl<Date | null>;
    applicationStatus: FormControl<IMultiSelectData[]>;
    onlyExpired: FormControl<IMultiCheckboxData[]>;
}

export interface AntiFraudCheckFilter {
    IdPE: string | null;
    applicationId: string | null;
    dateFrom: string | null;
    dateTo: string | null;
    applicationStatus: IMultiSelectData[] | null;
    onlyExpired: boolean | null;
}