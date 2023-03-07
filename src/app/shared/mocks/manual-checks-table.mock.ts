
import { GetPaymentsResponse } from '../models/manual-checks-models';

export const manualChecksTableData: GetPaymentsResponse[] = [
    {
        paymentID: 3,
        applicationID: "IBS_7722",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 4, 12, 53),
        plannedDate:  new Date(2023, 1, 1),
        amount: 550,
        type: "Перевод между своими счетами 1",
        statusPE: "Автоматические проверки пройдены 1",
        errorType: "Системная 1",
        channelIP: "",
        manualParse: 3,
        status: "Успешные статусы платежа/перевода"
    },
    {
        paymentID: 2,
        applicationID: "IBS_7713",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 7, 44, 14),
        plannedDate:  new Date(2023, 1, 1),
        amount: 400,
        type: "Перевод между своими счетами 2",
        statusPE: "Автоматические проверки пройдены 2",
        errorType: "Системная 2",
        channelIP: "",
        manualParse: 2,
        status: "Ошибочные статусы платежа/перевода"
    },
    {
        paymentID: 1,
        applicationID: "IBS_7512",
        paymentHubPaymentId: 0,
        pmtCreationTime: new Date(2023, 1, 1, 0, 0, 1),
        plannedDate:  new Date(2023, 1, 1),
        amount: 380,
        type: "Перевод между своими счетами 3",
        statusPE: "Автоматические проверки пройдены 3",
        errorType: "Системная 3",
        channelIP: "",
        manualParse: 1,
        status: "Ошибочные статусы платежа/перевода"
    }
]