import { FormControl } from "@angular/forms";
import { IMultiSelectData } from '../../../shared/components/controls/pe-multiselect/pe-multiselect.component';
import { IMultiCheckboxData } from './pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component';

export interface FormGroupManualChecksFilter {
    paymentID: FormControl<string | null>
    applicationID: FormControl<string | null>
    paymentHubPaymentId: FormControl<string | null>
    account: FormControl<string | null>
    dateStart: FormControl<Date | null>
    multiselect: FormControl<IMultiSelectData[] | null>
    multicheckbox: FormControl<IMultiCheckboxData[] | null>
}

export interface SearchPaymentChecksFilter {
    dateTimeFrom: FormControl<Date | null>
    dateTimeTo: FormControl<Date | null>
}