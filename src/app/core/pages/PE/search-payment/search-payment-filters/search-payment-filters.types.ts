export interface ISearchPaymentFilters {
  paymentID: string;
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
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  plannedDate: string | null;
  channelName: string[];
  parentType: string[];
  type: string[];
}
