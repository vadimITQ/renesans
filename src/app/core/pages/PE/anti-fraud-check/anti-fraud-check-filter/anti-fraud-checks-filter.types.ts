
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export interface AntiFraudCheckFilter {
    IdPE: string;
    applicationId: string;
    dateFrom: Date | null;
    dateTo: Date | null;
    applicationStatus: IMultiSelectData[];
    onlyExpired: boolean;
}