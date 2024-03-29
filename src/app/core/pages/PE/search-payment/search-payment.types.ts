export interface ISearchPaymentTableData {
  appCreationTime: string;
  plannedDate: string;
  statusCode: number;
  type: string;
  paymentSubType: string;
  budgetPaymentSubtype: string;
  paymentMethod: string;
  amount: number;
  fee: number;
  ownFeeAmount: number;
  creditFeeAmount: number;
  bonusAmount: number | string;
  bonusRub: number| string;
  loyaltyRate: number| string;
  bonusTypeName: string;
  bonusMaxPercent: string;
  paymentId: string;
  idPH: string;
  linkedChequeId: string;
  sourceSystem: string;

  //источник
  docNumSender: string;
  docIDSender: string;
  docStatusSender: string;
  accountSender: string;
  sbpMtelSender: string;

  //приемник
  targetSystem: string;
  docNumReceiver: string;
  docIDReceiver: string;
  docStatusReceiver: string;
  accountReceiver: string;
  sbpMtelReceiver: string;

  docNum: string;
  docID: string;
  bankBIC: string;
  serviceName: string;
  operatorLegalName: string;
  iptID: string;
  cifID: string;
  applicationID: string;
  statusDescriptionPe: string;
  parentType: string;
  chequeNumber: string;
  linkedChequeNumber: string;
  channelIP: string;
  messageToReceiver: string;
  sbpTransactionId: string;
  sbpWorkflowType: string;
  sbpFraudScore: string;
  transactionStatus: string;
  settlementDate: string;
}
