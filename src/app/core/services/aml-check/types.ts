export interface IAmlCheckFiltersPayload {
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  paymentID: string | null;
  applicationID: string | null;
  applicationStatus: string[] | null;
  onlyExpired: boolean;
}


export interface IAmlCheck {
  expired: number;
  paymentId: string;
  applicationId: string ;
  appCreationTime: string | null;
  statusAml: string;
  statusAntiFraud: string;
  statusBankOps: string;
  type: string;
  docAmount: number
}


export interface IAmlCheckResponse {
  count: number;
  limit: number | null;
  offset: number | null;
  amlChecks: IAmlCheck[];
}
