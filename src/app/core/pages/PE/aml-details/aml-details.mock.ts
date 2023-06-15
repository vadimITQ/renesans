import { IAmlDetails } from "./aml-details.types";

export const amlDetailsMockData: IAmlDetails = {
    info: {
        IdPE: "test test test",
        datePE: "test test test",
        fioPayer: "test test test",
        writeOffAccount: "-",
        recipientFio: "-",
        recipientAccount: "-",
        recipientINN: "-",
        recipientBankBIK: "test test test",
        appointment: "test test test",
        transferAmount: "-",
        commentary: null
    },
    automaticChecksData: [
        {
            rules: "Пройдена успешно",
            status: "без статуса"
        },
        {
            rules: "Пройдена успешно",
            status: "статус"
        },
        {
            rules: "Неуспешно",
            status: "статус 2"
        }
    ],
    manualChecksData: [
        {
            endData: new Date().toISOString(),
            login: "tst_full_test",
            startData: new Date().toISOString(),
            status: "тестовый статус",
            type: "AML"
        },
        {
            endData: new Date().toISOString(),
            login: "tst_full_test",
            startData: new Date().toISOString(),
            status: "тестовый статус",
            type: "AntiFraud"
        },
        {
            endData: new Date().toISOString(),
            login: "tst_full_test",
            startData: new Date().toISOString(),
            status: "тестовый статус",
            type: "BankOps"
        }
    ],
    docsData: [
        {
            docID: "123-123-123",
            fileData: "04.05.2023 12:32"
        },
        {
            docID: "123-123-125",
            fileData: "04.05.2023 12:33"
        }
    ],
    requestedDocsData: [
        {
            commentary: "Какой-то комментарий",
            docType: "Документ, подтверждающий право перехода",
            fileData: null
        },
        {
            commentary: "Какой-то комментарий",
            docType: "Счёт, на основании которого произвёлся платёж",
            fileData: null
        }
    ]
};
