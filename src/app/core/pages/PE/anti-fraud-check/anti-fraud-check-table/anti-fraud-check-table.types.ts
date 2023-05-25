
export interface AntiFraudCheckTable {
    count: number,
    limit: number,
    offset: number,
    data: AntiFraudChecksItem[];
}

export interface AntiFraudChecksItem {
    expireValue: string;
    IdPE: string;
    applicationId: string;
    dateTime: string;
    amlStatus: string;
    antiFraudStatus: string;
    bankOpsStatus: string;
    type: string;
    docCount: string;
}