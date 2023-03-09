export type TransferHistory = {
  time: string;
  code: string;
  status: string;
  details: string;
  errorType: string;
};

export type TransferDetail = {
  idPE: string;
  senderName: string;
  recipientName: string;
  recipientInn: string;
  aggregatorName: string;
  idPH: string;
  amount: string;
  creationDate: string | null;
  withdrawalAccount: string;
  recipientAccount: string;
  recipientBankBIC: string;
  beneficiaryName: string;
  appointment: string;
  transferHistory: TransferHistory[];
};
