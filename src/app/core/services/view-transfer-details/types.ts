export interface StatusHistory {
  codeStatus: string | null;
  description: string;
  errorType: string;
  statusChangeTime: string;
  statusComment: string | null;
}

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
