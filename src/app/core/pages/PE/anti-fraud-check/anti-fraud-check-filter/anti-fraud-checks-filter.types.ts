
import { FormControl } from "@angular/forms";
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export interface AntiFraudCheckFilterForm {
  paymentID: FormControl<string | null>;
  applicationID: FormControl<string | null>;
  dateTimeFrom: FormControl<Date | null>;
  dateTimeTo: FormControl<Date | null>;
  manualAntiFraudCheckStatusList: FormControl<IMultiSelectData[] | null>;
  agedOnly: FormControl<boolean>;
}