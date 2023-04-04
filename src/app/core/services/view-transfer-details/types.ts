export type StatusHistory = {
  appCreationTime: string | null;
  errorType: string;
  status: string;
  statusCode: string;
};

export interface ITransferDetails {
  amount: number;
  appCreationTime: string | null;
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
