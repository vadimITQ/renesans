import { FormArray, FormControl } from "@angular/forms"
import { IApplicationDetails, IAutoCheck, IManualCheck, IRequestedDocument, IResponsedDocument } from '../../../../shared/types/get-application-details';
import { IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";

export interface IBankOpsFormGroup {
  paymentID: FormControl<string | null>;
  pmtCreationTime: FormControl<string | null>;
  payerName: FormControl<string | null>;
  payerAccount: FormControl<string | null>;
  payeeName: FormControl<string | null>;
  payeeAccount: FormControl<string | null>;
  payeeINN: FormControl<string | null>;
  payeeBIC: FormControl<string | null>;
  paymentPurpose: FormControl<string | null>;
  amount: FormControl<number | null>;
  autoChecks: FormArray<FormControl<IAutoCheck | null>>;
  manualChecks: FormArray<FormControl<IManualCheck | null>>;
  requestedDocuments: FormArray<FormControl<IRequestedDocument | null>>;
  responsedDocuments: FormArray<FormControl<IResponsedDocument | null>>;
  commentary: FormControl<string | null>;
}

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
