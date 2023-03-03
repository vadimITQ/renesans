export interface ISearchPaymentFilters {
  paymentId: string;
  applicationID: string;
  idPH: string;
  docID: string;
  linkedChequeId: string;
  docNum: string;
  account: string;
  channelIP: string;
  userAgent: string;
  chequeNumber: string;
  statusCode: string;
  appCreationTime?: string;
  dateFrom: string | null;
  dateTo: string | null;
  plannedDate: string | null;
  channelName: string[];
  parentType: string[];
  type: string;
}
