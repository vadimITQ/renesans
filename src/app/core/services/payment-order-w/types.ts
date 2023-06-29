
export enum CancelReason {
  CLIENT = 'CLIENT',
  FRAUD = 'FRAUD',
  BANK_OPS = 'BANK_OPS',
}

export interface ICancelPaymentPayload {
  // АpplicationChannelName: string;
  // chennelUser: string;
  description: string;
  cancelReason: string;
  paymentID: string;
  channelName: string;
  channelUser: string;
  // АpplicationChannelName: string;
  // cancelReason?: string;
  // DESCRIPTION?: string;
}

export interface IResumePaymentPayload {
  // paymentID: string;
  // channelName: string;
  // chennelUser: string;
  // description: string;
  paymentID: string;
  ResumeComment?: string;
  channelUser?: string;
  АpplicationChannelName: string;
}

export interface ICancelPaymentResponse {
  result: string;
  errorCode?: string;
  errorMessage?: string;
  attrErrors: any;
  // httpCode: string;
  // httpMessage: string;
  // moreInformation: string;
}

export interface IResumePaymentResponse {
  result: string;
  errorCode?: string;
  errorMessage?: string;
  attrErrors: any;
}
