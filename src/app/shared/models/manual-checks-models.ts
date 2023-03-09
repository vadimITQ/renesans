export interface ManualChecksFilter {
  paymentID?: number;
  applicationID?: number;
  paymentHubPaymentId?: number;
  account?: number;
  dateFrom: string | null;
  dateTo: string | null;
  timeFrom?: string | Date;
  timeTo?: string | Date;
  status?: string[] | number[];
  types?: string[] | number[];
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
    rowStatus?: "erroneous" | "successful";
}
//   paymentID?: number | string;
//   applicationID?: string;
//   paymentHubPaymentId?: number;
//   pmtCreationTime?: Date;
//   plannedDate?: Date;
//   amount?: number;
//   type?: string;
//   statusPE?: string;
//   errorType?: string;
//   channelIP?: string;
//   manualParse?: number;
//   status?: string;
// }
