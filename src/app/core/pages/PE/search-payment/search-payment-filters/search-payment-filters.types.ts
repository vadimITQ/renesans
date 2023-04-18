import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';
import { IMultiCheckboxData } from '../../../../../shared/components/controls/pe-multi-checkbox/pe-multi-checkbox.component';

export interface ISearchPaymentFilters {
  paymentID: string | null;
  applicationID: string | null;
  idPH: string | null;
  docID: string | null;
  linkedChequeId: string | null;
  docNum: string | null;
  account: string | null;
  channelIP: string | null;
  userAgent: string | null;
  chequeNumber: string | null;
  statusCode: string | null;
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  plannedDate: string | null;
  channelName: IMultiSelectData[];
  parentType: IMultiSelectData[];
  type: IMultiSelectData[];
  codeStatuses: IMultiSelectData[];
}
