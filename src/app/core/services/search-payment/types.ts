export interface ISearchPaymentsFiltersPayload {
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  paymentID: string | null;
  applicationID: string | null;
  docNum: string | null;
  userAgent: string | null;
  idPH: string | null;
  docID: string | null;
  account: string | null;
  channelIP: string | null;
  chequeNumber: string | null;
  chequeId: string | null;
  plannedDate: string | null;
  statusCode: string[] | null;
  channelName: string[] | null;
  parentType: string[] | null;
  type: string[] | null;
}

export type ApplicationChannel = {
  channelName: string;
  channelUser: string;
  channelIP: string;
  branchCode: string;
  iptID: string;
  iptAddress: string;
};

export type ServicePaymentParameter = {
  code: string;
  displayName: string;
  value: string;
  hidden: boolean;
  paymentParameterType: string;
  displayValueName: string;
};

export type User = {
  cardNumber:string| null
  cifID:string| null
  inn: string
  naturalName: string
  naturalPatronymic: string
  naturalSurname: string
  phoneNumber:string| null
  sbpMtel:string| null
  status: string
};

export type Requisites = {
  account: string
  address: string|null
  bankBIC: string
  bankCorrAccount: string
  bankName: string
  bankSbpMemberId: string|null
  contractNumber: string
  sbpIdType: string | null
}

export type Entity = {
  kpp:string | null
  legalEntityId:string | null
  legalName:string | null
  ogrn:string | null
  sbpMerchantId:string | null
  sbpQrId:string | null
  tradeName:string | null
  tspAgentId:string | null
};

export type PayerOrPayee = {
  user: User;
  requisites: Requisites;
  entity: Entity;
};

export type Budget = {
  budgetPaymentSubtype: string;
  oktmo: string;
  taxPayerStatus: string;
  taxReason: string;
  taxPeriod: string;
  taxDocumentNumber: string;
  taxDocumentDate: string;
  taxPaymentType: string;
  uin: string;
  uip: string;
  kbk: string;
};

export type Conversion = {
  targetAmount: number;
  targetCurrency: string;
  exchangeRate: number;
  scale: number;
  refScale: number;
};

export type Bonus = {
  bonusMaxPercent: number;
  bonusAmount: number;
  bonusRub: number;
  loyaltyRate: number;
  loyaltyRefundDocumentNumber: string;
  loyaltyRedemptionRuleId: string;
  bonusTypeName: string;
  targetAmount: number;
  targetCurrency: string;
};

export type SBP = {
  sbpTransactionId: string;
  streamId: string;
  referenceSbpTransactionId: string;
  sbpWorkflowType: string;
  scenario: string;
  senderBankFraudScore: string;
  receiverBankFraudScore: string;
  sbpFraudScore: string;
  transactionStatus: string;
  settlementDate: string;
  sbpFeeBank: number;
  sbpFeeNSPK: number;
  legalEntityId: string;
  sbpCheckSum: string;
};

export type Service = {
  serviceId: number;
  serviceName: string;
  serviceTypeId: string;
  serviceVersion: number;
  serviceTypeName: string;
};

export type Operator = {
  operatorId: string;
  operatorPaymentID: string;
  operatorLegalName: string;
  operatorContactPhone: string;
  operatorLegalAddress: string;
  operatorPostAddress: string;
  operatorINN: string;
  operatorRRCode: string;
  operatorName: string;
};

export type ServicePayment = {
  service: Service;
  operator: Operator;
  sessionId: string;
  ekassirPayee: string;
};

export type IPT = {
  service: Service;
  glNdsAccount: string;
  glFeeIncomeAccount: string;
  idPH: string;
  chequeId: string;
  chequeNumber: string;
  linkedChequeNumber: string;
  linkedChequeId: string;
  paymentSubType: string;
};

export type Check = {
  autoAMLCheckStatus: number;
  autoAntiFraudCheckStatus: number;
  autoBankOpsCheckStatus: number;
  manualAMLCheckStatus: number;
  manualAntiFraudCheckStatus: number;
  manualBankOpsCheckStatus: number;
};

export interface IPaymentApplication {
  applicationChannel: ApplicationChannel;
  servicePaymentParameters: ServicePaymentParameter[];
  payer: PayerOrPayee;
  payee: PayerOrPayee;
  budget: Budget;
  conversion: Conversion;
  bonus: Bonus;
  sbp: SBP;
  servicePayment: ServicePayment;
  ipt: IPT;
  check: Check;
  applicationID: string;
  appCreationTime: string;
  statusCode: string;
  status: string;
  clientStatus: string;
  type: string;
  paymentMethod: string;
  fee: number;
  creditFeeAmount: number;
  ownFeeAmount: number;
  feeIncomeAccount: string;
  amount: number;
  currency: string;
  paymentPurpose: string;
  transferPurpose: string;
  subscriptionPurpose: string;
  messageToReceiver: string;
  parentID: string;
  parentType: string;
  paymentSubType: string;
  openDepositId: string;
}

export type PayDoc = {
  docID: string;
  docNum: string;
  dc: string;
  authCode: string;
  docStatus: string;
  accountingSystem: string;
  docFinOperCode: string;
  docBatchCode: string;
  docOperCode: string;
  sak: string;
  holdID: string | null;
  accntDRdescr: string | null;
  accntCRdescr: string | null;
  docParentID: string | null;
  accntDeb: string | null;
  accntCre: string | null;
};

export interface ISearchPayment {
  paymentApplication: IPaymentApplication;
  paymentID: string;
  sourceSystem: string;
  targetSystem: string;
  plannedDate: string;
  id359: string;
  id361: string;
  idPF: string;
  idW4: string;
  payerName: string;
  payerNameCBR: string;
  statusCodePE: number;
  statusChangeTime: string;
  faults: (string | null)[];
  payDocs: PayDoc[] | null;
  pmtCreationTime: string | null;
  cancelReason: string;
  cancelReasonCode: string | null;
  eventCode: string | null;
  eventTime: string | null;
  errorType: string | null;
  description: string | null;
  dcHeader: string | null;
  paymentPosting: string | null;
  statusDescriptionPe: string | null;
  statusPE: string | null;
  manualParse?: number | null;
  rowStatus?: string;
}

export interface IPayment {
  manualParse: number | null;
  payment: ISearchPayment;
}

export interface ISearchPaymentsResponse {
  count: number;
  limit: number | null;
  offset: number | null;
  payments: IPayment[];
}
