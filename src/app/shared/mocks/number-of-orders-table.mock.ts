import { StandingOrderStatResponse } from '../models/monitoring-standing-orders';
import { monitoringDataRecordMock } from './transfer-payment-history-by-status-table.mock';

export const tableValuesMock: StandingOrderStatResponse = {
  standingOrdersCount: 1200,
  plannedForDateCount: 500,
  processedCount: 500,
  successfullyProcessedCount: 498,
  failedProcessedCount: 1,
  processingCount: 1,
  monitoringDataRecord: monitoringDataRecordMock,
};
