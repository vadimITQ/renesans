import { MonitoringDataRecord } from "src/app/core/pages/PE/monitoring-standing-orders/monitoring-standing-orders.types";

export const monitoringDataRecordMock: MonitoringDataRecord[] = [
  {
    standingOrderId: 4533,
    startDate: new Date('2023-01-22T03:24:00'),
    storPmtType: 'Между своими счетами',
    amount: 3000,
    sourceAccount: 4523452352,
    targetAccount: 3212234234,
    planEndDate: new Date('2023-01-22T03:24:00'),
    periodicity: 'Еженедельно Пн',
    paymentId: 23545,
    status: 'В обработке',
    errorDescription: '',
    storAppId: 'CREATE',
  },
  {
    standingOrderId: 4534,
    startDate: new Date('2023-01-22T03:24:00'),
    storPmtType: 'Между своими счетами',
    amount: 1000,
    sourceAccount: 4523452352,
    targetAccount: 3212234234,
    planEndDate: new Date('2023-01-22T03:24:00'),
    periodicity: 'Еженедельно Вт',
    paymentId: 23546,
    status: 'Отклонена',
    errorDescription: '',
    storAppId: 'CANCEL',
  },
];
