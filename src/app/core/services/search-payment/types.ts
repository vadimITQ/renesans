export interface ISearchPaymentsPayload {
  dateTimeFrom: string;
  dateTimeTo: string;
  paymentID: string;
  applicationID: string;
  idPH: string;
  docID: string;
  account: string;
  channelIP: string;
  chequeNumber: string;
  linkedChequeId: string;
  statusCode: string;
  plannedDate: string;
  channelName: string[];
  parentType: string[];
  type: string[];
}
