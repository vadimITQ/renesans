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
  statusCode: IMultiCheckboxData[];
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  plannedDate: string | null;
  channelName: IMultiCheckboxData[];
  parentType: IMultiCheckboxData[];
  type: IMultiCheckboxData[];
}
