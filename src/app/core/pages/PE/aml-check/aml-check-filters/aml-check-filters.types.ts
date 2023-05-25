import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';

export interface IAmlCheckFilters {
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  paymentID: string | null;
  applicationID: string | null;
  applicationStatus: IMultiSelectData[];
  onlyExpired: boolean;
}
