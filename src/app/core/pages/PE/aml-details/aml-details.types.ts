
export interface IAmlDetails {
    automaticChecksData: IAmlDetailsAutomaticChecks[];
    manualChecksData: IAmlDetailsManualChecks[];
    docsData: IAmlDetailsDocs[];
    requestedDocsData: IAmlDetailsRequestedDocs[];
}

export interface IAmlDetailsAutomaticChecks {
    status: string;
    rules: string | string[];
}

export interface IAmlDetailsManualChecks {
    type: string;
    status: string;
    login: string;
    startData: string;
    endData: string;
}

export interface IAmlDetailsDocs {
    docID: string;
    fileData: string;
}

export interface IAmlDetailsRequestedDocs {
    docType: string;
    commentary: string;
    fileData: any;
}
