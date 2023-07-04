import { IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";

export interface IBankOpsDetails {
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
  filesData: IPEUploadingData;
  commentaryBankOps: string;
  commentaryAML: string;
}
