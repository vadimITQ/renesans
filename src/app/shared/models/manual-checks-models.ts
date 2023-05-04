import { FormControl } from "@angular/forms";
import { IMultiSelectData } from "../components/controls/pe-multiselect/pe-multiselect.component";

export interface ManualChecksFilter {
  paymentID: FormControl<string | null>,
  applicationID: FormControl<string | null>,
  idPH: FormControl<string | null>,
  account: FormControl<string | null>,
  dateTimeFrom: FormControl<Date | null>
  dateTimeTo: FormControl<Date | null>
  channelName: FormControl<IMultiSelectData[]>,
  codeStatuses: FormControl<IMultiSelectData[]>,
  parentType: FormControl<IMultiSelectData[]>
}

export interface ManualChecksProps {
  paymentID: string | null;
  applicationID: string | null;
  idPH: string | null;
  account: string | null;
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  channelName: IMultiSelectData[];
  codeStatuses: IMultiSelectData[];
  parentType: IMultiSelectData[];
}

export interface GetPaymentsResponse {
    paymentID?: string;
    applicationID?: string;
    paymentHubPaymentId?: number;
    pmtCreationTime?: string;
    plannedDate?: string;
    amount?: number;
    type?: string;
    statusPE?: string;
    errorType?: string;
    channelIP?: string;
    manualParse?: number;
    statusCodePE?: number;
    status?: string;
    rowStatus?: "erroneous" | "successful";
}
//   paymentID?: number | string;
//   applicationID?: string;
//   paymentHubPaymentId?: number;
//   pmtCreationTime?: Date;
//   plannedDate?: Date;
//   amount?: number;
//   type?: string;
//   statusPE?: string;
//   errorType?: string;
//   channelIP?: string;
//   manualParse?: number;
//   status?: string;
// }
