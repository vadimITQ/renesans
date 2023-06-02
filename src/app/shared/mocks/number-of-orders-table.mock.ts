
import { StandingOrderStatResponse } from "src/app/core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.types";
import { monitoringDataRecordMock } from "../mocks/transfer-payment-history-by-status-table.mock"

export const tableValuesMock: StandingOrderStatResponse = {
    standingOrdersCount: 1200,
    plannedForDateCount: 500,
    processedCount: 500,
    successfullyProcessedCount: 498,
    failedProcessedCount: 1,
    processingCount: 1,
    monitoringDataRecord: monitoringDataRecordMock
};