import { FormControl } from "@angular/forms"

export interface IBankOpsFormGroup {
    IdPE: FormControl<string | null>;
    PeDate: FormControl<string | null>;
    FioPayment: FormControl<string | null>;
    writeOffAccount: FormControl<string | null>;
    fioRecipient: FormControl<string | null>;
    accountRecipient: FormControl<string | null>;
    InnRecipient: FormControl<string | null>;
    bikBankRecipient: FormControl<string | null>;
    appointment: FormControl<string | null>;
    transferAmount: FormControl<string | null>;
    commentary: FormControl<string | null>;
}

export interface IBankOpsDetails {
    infoBlock: {
        IdPE: string | null;
        PeDate: string | null;
        FioPayment: string | null;
        writeOffAccount: string | null;
        fioRecipient: string | null;
        accountRecipient: string | null;
        InnRecipient: string | null;
        bikBankRecipient: string | null;
        appointment: string | null;
        transferAmount: string | null;
    };
    automaticChecksData: IBankOpsDetailsAutomaticChecks[];
    manualChecksData: IBankOpsDetailsManualChecks[];
    docsData: IBankOpsDetailsDocs[];
    requestedDocsData: IBankOpsDetailsRequestedDocs[];
}

export interface IBankOpsDetailsAutomaticChecks {
  status: string;
  rules: string | string[];
}

export interface IBankOpsDetailsManualChecks {
  type: string;
  status: string;
  login: string;
  startData: string;
  endData: string;
}

export interface IBankOpsDetailsDocs {
  docID: string;
  fileData: string;
}

export interface IBankOpsDetailsRequestedDocs {
  docType: string;
  commentary: string;
  fileData: any;
}
