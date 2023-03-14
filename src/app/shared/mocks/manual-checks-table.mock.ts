import { GetPaymentsResponse } from '../models/manual-checks-models';

export const manualChecksTableData: GetPaymentsResponse[] = [
  {
    paymentID: '10fef8e7-e3cc-38b4-90c7-0e5f218c1dc7',
    applicationID: 'IBS_7722',
    paymentHubPaymentId: 0,
    pmtCreationTime: "2023-12-05 10:22:00",
    plannedDate: "2023-12-05 10:22:00",
    amount: 550,
    type: 'Перевод между своими счетами 1',
    statusPE: 'Автоматические проверки пройдены 1',
    errorType: 'Системная 1',
    channelIP: '',
    statusCodePE: 1150,
    manualParse: 3,
    status: 'Успешные статусы платежа/перевода',
  },
  {
    paymentID: "2",
    applicationID: 'IBS_7713',
    paymentHubPaymentId: 0,
    pmtCreationTime: "2022-11-03 11:23:00",
    plannedDate: "2022-11-03 11:23:00",
    amount: 400,
    type: 'Перевод между своими счетами 2',
    statusPE: 'Автоматические проверки пройдены 2',
    errorType: 'Системная 2',
    channelIP: '',
    statusCodePE: 150,
    manualParse: 2,
    status: 'Ошибочные статусы платежа/перевода',
  },
  {
    paymentID: "1",
    applicationID: 'IBS_7512',
    paymentHubPaymentId: 0,
    pmtCreationTime: "2020-07-04 07:12:01",
    plannedDate: "2020-07-04 07:12:01",
    amount: 380,
    type: 'Перевод между своими счетами 3',
    statusPE: 'Автоматические проверки пройдены 3',
    errorType: 'Системная 3',
    channelIP: '',
    statusCodePE: 700,
    manualParse: 1,
    status: 'Ошибочные статусы платежа/перевода',
  },
];
