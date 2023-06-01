export interface ISearchPaymentTableData {
  paymentID: string;
  pmtCreationTime: string;
  plannedDate: string;
  statusCodePE: number;
  statusDescriptionPE: string;
  type: string;
  amount: number;
  fee: number;
  sourceSystem: string;
  docNum_D: string;
  docStatus_D: string;
  docID_D: string;
  targetSystem: string;
  docNum_C: string;
  docStatus_C: string;
  docID_C: string;
  cifID: string;
  applicationID: string;
  referenceSbpTransactionId: string;
  sbpWorkflowType: string;
  idPH: string;
}
