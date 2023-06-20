export interface StandingOrderStatResponse {
  standingOrdersCount: number;
  plannedForDateCount: number;
  processedCount: number;
  successfullyProcessedCount: number;
  failedProcessedCount: number;
  processingCount: number;
  monitoringDataRecord: MonitoringDataRecord[];
}

export interface MonitoringDataRecord {
    standingOrderId: number;
    startDate: Date;
    storPmtType: string;
    amount: number;
    sourceAccount: number;
    targetAccount: number;
    planEndDate: Date;
    periodicity: string;
    paymentId: number;
    status: string;
    errorDescription: string;
    storAppId: "CREATE" | "CANCEL";
}
