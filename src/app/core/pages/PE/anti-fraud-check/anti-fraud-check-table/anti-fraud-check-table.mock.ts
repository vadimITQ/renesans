import { AntiFraudCheckTable } from "./anti-fraud-check-table.types";

export const antiFraudChecksMock: AntiFraudCheckTable = {
    count: 2,
    limit: 2,
    offset: 2,
    data: [
        {
            expireValue: "1",
            IdPE: "294317ac-84ed-4ed9-bf02-",
            applicationId: "IBS-105546376",
            dateTime: "2023-03-20T18:11:11",
            amlStatus: "Ожидает рассмотрения",
            antiFraudStatus: "Ожидает рассмотрения",
            bankOpsStatus: "Ожидает рассмотрения",
            type: "Платеж/перевод",
            docCount: "0"
        },
        {
            expireValue: "2",
            IdPE: "151217ac-84ed-4ed3-fg02-",
            applicationId: "IBS-53241231",
            dateTime: "2023-02-14T14:12:21",
            amlStatus: "Ожидает рассмотрения",
            antiFraudStatus: "Ожидает рассмотрения",
            bankOpsStatus: "Ожидает рассмотрения",
            type: "Платеж/перевод",
            docCount: "0"
        }
    ]
};