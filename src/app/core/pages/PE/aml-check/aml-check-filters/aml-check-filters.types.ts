import { FormControl } from '@angular/forms';
import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';

export interface IAmlCheckFiltersForm {
  dateTimeFrom: FormControl<Date | null>;
  dateTimeTo: FormControl<Date | null>;
  paymentID: FormControl<string | null>;
  applicationID: FormControl<string | null>;
  applicationStatuses: FormControl<IMultiSelectData[] | null>;
  agedOnly: FormControl<boolean>;
}

export interface IAmlCheckFilters {
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  paymentID: string | null;
  applicationID: string | null;
  applicationStatuses: IMultiSelectData[];
  agedOnly: boolean;
}
