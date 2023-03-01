
import { GetPaymentsResponse } from '../models/manual-checks-models';

export const manualChecksTableData: GetPaymentsResponse[] = [
    {
        paymentID: 3,
        applicationID: "IBS_7777",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 4, 12, 53),
        plannedDate:  new Date(2023, 1, 1),
        amount: 500,
        type: "Перевод между своими счетами",
        statusPE: "Автоматические проверки пройдены",
        errorType: "Системная",
        channelIP: "",
        manualParse: 3,
        status: "Успешные статусы платежа/перевода"
    },
    {
        paymentID: 2,
        applicationID: "IBS_7777",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 7, 44, 14),
        plannedDate:  new Date(2023, 1, 1),
        amount: 500,
        type: "Перевод между своими счетами",
        statusPE: "Автоматические проверки пройдены",
        errorType: "Системная",
        channelIP: "",
        manualParse: 2,
        status: "Ошибочные статусы платежа/перевода"
    },
    {
        paymentID: 1,
        applicationID: "IBS_7777",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 0, 0, 1),
        plannedDate:  new Date(2023, 1, 1),
        amount: 500,
        type: "Перевод между своими счетами",
        statusPE: "Автоматические проверки пройдены",
        errorType: "Системная",
        channelIP: "",
        manualParse: 1,
        status: "Ошибочные статусы платежа/перевода"
    }
]