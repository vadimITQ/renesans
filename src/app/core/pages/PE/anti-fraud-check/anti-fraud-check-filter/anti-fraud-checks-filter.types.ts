
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export interface AntiFraudCheckFilter {
  dateTimeFrom: Date | null;
  dateTimeTo: Date | null;
  paymentID: string | null;
  applicationID: string | null;
  manualAntiFraudCheckStatusList: IMultiSelectData[];
  agedOnly: boolean;
}
