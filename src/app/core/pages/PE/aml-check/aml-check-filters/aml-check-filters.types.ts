import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';

export interface IAmlCheckFilters {
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  paymentID: string | null;
  applicationID: string | null;
  applicationStatus: IMultiSelectData[];
  onlyExpired: boolean;
}
