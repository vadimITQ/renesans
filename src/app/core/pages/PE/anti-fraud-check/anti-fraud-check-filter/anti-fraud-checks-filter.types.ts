
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export interface AntiFraudCheckFilter {
    IdPE: string;
    applicationId: string;
    dateFrom: string | null;
    dateTo: string | null;
    applicationStatus: IMultiSelectData[];
    onlyExpired: boolean;
}