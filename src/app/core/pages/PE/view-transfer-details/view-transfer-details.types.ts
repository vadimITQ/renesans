import { FormControl } from "@angular/forms";
import {ITransferDetails} from "../../../services/view-transfer-details/types";

export interface ITransferDetailsWithRetRefNumber extends ITransferDetails {
  retRefNumber: string
}

export interface ItransferDetailsForm {
  amount: FormControl<number | null>;
  appCreationTime: FormControl<string | null>;
  idPH: FormControl<string | null>;
  operatorLegalName: FormControl<string | null>;
  payeeAccount: FormControl<string | null>;
  payeeBankBIC: FormControl<string | null>;
  payeeInn: FormControl<string | null>;
  payeeName: FormControl<string | null>;
  payerAccount: FormControl<string | null>;
  payerName: FormControl<string | null>;
  paymentID: FormControl<string | null>;
  paymentPurpose: FormControl<string | null>;
  serviceName: FormControl<string | null>;
  retRefNumber: FormControl<string | null>;
}