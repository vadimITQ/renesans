import { AntiFraudDetails } from "./anti-fraud-details.types";

export const antiFraudAutomaticChecks = [
    {
        status: " ",
        rules: " "
    }
];

export const antiFraudInfo: AntiFraudDetails = {
    IdPE: 'test',
    paymentDatePE: 'test',
    fioPayer: '-',
    writeOffAccount: '-',
    recipientFio: '-',
    recipientAccount: 'test',
    recipientINN: 'test',
    recipientBankBIK: 'test',
    appointment: 'test',
    transferAmount: 'test',
    ip: 'test',
    userAgent: 'test'
}

export const antiFraudManualChecks = [
    {
        type: " ",
        status: " ",
        login: " ",
        startData: " ",
        endData: " "
    },
    {
        type: " ",
        status: " ",
        login: " ",
        startData: " ",
        endData: " "
    },
    {
        type: " ",
        status: " ",
        login: " ",
        startData: " ",
        endData: " "
    }
];

export const antiFraudDetails = {
    antiFraudAutomaticChecks: antiFraudAutomaticChecks,
    antiFraudManualChecks: antiFraudManualChecks,
    antiFraudInfo: antiFraudInfo
};
