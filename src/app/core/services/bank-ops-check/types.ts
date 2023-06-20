export interface IBankOpsCheckFiltersPayload {
  dateTimeFrom: string | null;
  dateTimeTo: string | null;
  paymentID: string | null;
  applicationID: string | null;
  applicationStatus: string[] | null;
}

export interface IBankOpsCheck {
  paymentId: string;
  applicationId: string;
  appCreationTime: string | null;
  statusAML: string;
  statusAntiFraud: string;
  statusBankOps: string;
  type: string;
  docAmount: number;
}

export interface IBankOpsCheckResponse {
  count: number;
  limit: number | null;
  offset: number | null;
  bankOpsChecks: IBankOpsCheck[];
}
