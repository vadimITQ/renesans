import { FormControl } from '@angular/forms';
import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';

export interface IBankOpsCheckFilterForm {
  dateTimeFrom: FormControl<Date | null>;
  dateTimeTo: FormControl<Date | null>;
  paymentID: FormControl<string | null>;
  applicationID: FormControl<string | null>;
  manualBankOpsCheckStatusList: FormControl<IMultiSelectData[] | null>;
}

export interface IBankOpsCheckFilters {
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  paymentID: string | null;
  applicationID: string | null;
  manualBankOpsCheckStatusList: IMultiSelectData[];
}
