
export interface ManualChecksFilter {
    paymentID?: number;
    applicationID?: number;
    paymentHubPaymentId?: number;
    account?: number;
    dateFrom?: Date;
    dateTo?: Date;
    timeFrom?: string | Date;
    timeTo?: string | Date;
    statusCode?: string;
    type?: string;
}

export interface GetPaymentsResponse {
    paymentID?: number;
    applicationID?: string;
    paymentHubPaymentId?: number;
    pmtCreationTime?: Date;
    plannedDate?: Date;
    amount?: number;
    type?: string;
    statusPE?: string;
    errorType?: string;
    channelIP?: string;
    manualParse?: number;
    status?: string;
}