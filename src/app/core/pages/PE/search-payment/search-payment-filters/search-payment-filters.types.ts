import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';
import { FormControl } from '@angular/forms';

export interface ISearchPaymentFilterForm {
  paymentID: FormControl<string | null>;
  applicationID: FormControl<string | null>;
  idPH: FormControl<string | null>;
  docID: FormControl<string | null>;
  linkedChequeId: FormControl<string | null>;
  docNum: FormControl<string | null>;
  account: FormControl<string | null>;
  chequeNumber: FormControl<string | null>;
  channelIP: FormControl<string | null>;
  userAgent: FormControl<string | null>;
  dateTimeFrom: FormControl<Date | null>;
  dateTimeTo: FormControl<Date | null>;
  plannedDate: FormControl<Date | null>;
  channelName: FormControl<IMultiSelectData[]>;
  codeStatuses: FormControl<IMultiSelectData[]>;
  parentType: FormControl<IMultiSelectData[]>;
  type: FormControl<IMultiSelectData[]>;
}

export interface ISearchPaymentFilters {
  paymentID: string | null;
  applicationID: string | null;
  idPH: string | null;
  docID: string | null;
  chequeId: string | null;
  docNum: string | null;
  account: string | null;
  channelIP: string | null;
  userAgent: string | null;
  chequeNumber: string | null;
  statusCode: string | null;
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  plannedDate: Date | null;
  channelName: IMultiSelectData[];
  parentType: IMultiSelectData[];
  type: IMultiSelectData[];
  codeStatuses: IMultiSelectData[];
}
