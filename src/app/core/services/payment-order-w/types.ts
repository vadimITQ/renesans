
export enum CancelReason {
    CLIENT = "CLIENT",
    FRAUD = "FRAUD"
}

export interface ICancelPaymentPayload {
    channelName: string;
    chennelUser: string;
    description?: string;
    cancelReason: string;
    paymentID: string;
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
}

export interface ICancelPaymentResponse {
    result: string;
    errorCode?: string;
    errorMessage?: string;
    // httpCode: string;
    // httpMessage: string;
    // moreInformation: string;
}

export interface IResumePaymentResponse {
    result: string;
    errorCode?: string;
    errorMessage?: string;
}