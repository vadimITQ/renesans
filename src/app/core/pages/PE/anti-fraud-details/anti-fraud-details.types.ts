
import { FormArray, FormControl } from "@angular/forms";
import { IApplicationDetails, IManualCheck } from '../../../../shared/types/get-application-details';

export interface IAntiFraudAutoCheck {
  status: string;
  rules: string;
}

export interface AntiFraudDetailsForm {
  autoChecks: FormArray<FormControl<IAntiFraudAutoCheck | null>>,
  manualChecks: FormArray<FormControl<IManualCheck | null>>,
  paymentID: FormControl<string | null>,
  pmtCreationTime: FormControl<string | null>,
  payerName: FormControl<string | null>,
  payerAccount: FormControl<string | null>,
  payeeName: FormControl<string | null>,
  payeeAccount: FormControl<string | null>,
  payeeINN: FormControl<string | null>,
  payeeBIC: FormControl<string | null>,
  paymentPurpose: FormControl<string | null>,
  amount: FormControl<number | null>
}

export interface IAntiFraudDetails extends Pick<IApplicationDetails, 'manualChecks'> {
  autoChecks: IAntiFraudAutoCheck[];
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
