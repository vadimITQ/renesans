import { FormControl } from "@angular/forms";

export interface IAmlDetailsForm {
    IdPE: FormControl<string | null>;
    datePE: FormControl<string | null>;
    fioPayer: FormControl<string | null>;
    writeOffAccount: FormControl<string | null>;
    recipientFio: FormControl<string | null>;
    recipientAccount: FormControl<string | null>;
    recipientINN: FormControl<string | null>;
    recipientBankBIK: FormControl<string | null>;
    appointment: FormControl<string | null>;
    transferAmount: FormControl<string | null>;  
    commentary: FormControl<string | null>;
}

export interface IAmlDetails {
    info: IAmlInfo;
    automaticChecksData: IAmlDetailsAutomaticChecks[];
    manualChecksData: IAmlDetailsManualChecks[];
    docsData: IAmlDetailsDocs[];
    requestedDocsData: IAmlDetailsRequestedDocs[];
}

export interface IAmlInfo {
    IdPE: string | null;
    datePE: string | null;
    fioPayer: string | null;
    writeOffAccount: string | null;
    recipientFio: string | null;
    recipientAccount: string | null;
    recipientINN: string | null;
    recipientBankBIK: string | null;
    appointment: string | null;
    transferAmount: string | null;
    commentary: string | null;
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
