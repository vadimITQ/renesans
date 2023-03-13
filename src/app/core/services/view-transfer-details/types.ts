export type StatusHistory = {
  appCreationTime: number;
  errorType: string;
  status: string;
  statusCode: string;
};

export interface ITransferDetails {
  amount: number;
  appCreationTime: number;
  idPH: string;
  operatorLegalName: string;
  payeeAccount: string;
  payeeBankBIC: string;
  payeeInn: string;
  payeeName: string;
  payerAccount: string;
  payerName: string;
  paymentID: string;
  paymentPurpose: string;
  serviceName: string;
  statusHistory: StatusHistory[];
}
