
export interface IGetApplicationsListPayload {
  paymentID?: string;
  agedOnly?: boolean;
  applicationID?: string;
  dateTimeFrom?: string;
  dateTimeTo?: string;
  applicationStatuses?: string[];
  manualAMLCheckStatusList?: string[];
  manualAntiFraudCheckStatusList?: string[];
  manualBankOpsCheckStatusList?: string[];
}

export interface IApplication {
  appCreationDate: string;
  appCreationTime: string;
  applicationID: string;
  manualAMLCheckStatus: string;
  manualAntiFraudCheckStatus: string;
  manualBankOpsCheckStatus: string;
  numberOfDocuments: number;
  overdueDays: number | null;
  parentType: string;
  paymentID: string;
  pmtCreationTime: string;
  shiftedDate: number | null;
  type: string;
}

export interface IGetApplicationListResponse {
  count: number;
  limit: number | null;
  offset: number | null;
  applications: IApplication[];
}
