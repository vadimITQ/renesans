import { IApplicationDetails } from '../../../../shared/types/get-application-details';
import { IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";

export interface IBankOpsDetails
  extends Pick<
    IApplicationDetails,
    'autoChecks' | 'manualChecks' | 'requestedDocuments'  | 'responsedDocuments'
  > {
  paymentID: string;
  pmtCreationTime: string;
  payerName: string;
  payerAccount: string;
  payeeName: string;
  payeeAccount: string;
  payeeINN: string;
  payeeBIC: string;
  paymentPurpose: string;
  amount: number;
}

export interface IBankOpsDetailsRequestedDocs {
  filesData: IPEUploadingData;
  commentaryBankOps: string;
  commentaryAML: string;
}
