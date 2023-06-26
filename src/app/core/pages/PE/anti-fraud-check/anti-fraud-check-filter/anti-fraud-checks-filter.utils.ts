
import { subDays } from "date-fns";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";

export class AntiFraudChecksFilterUtils {

    static getDefaultFilter(): AntiFraudCheckFilter {

        const dateTo = new Date();
        const dateFrom = subDays(dateTo, 3);
        const applicationStatus: IMultiSelectData[] = [{
            label: "Ожидает рассмотрения AntiFraud",
            value: "Ожидает рассмотрения AntiFraud"
        }];
        
        return  {
            IdPE: "",
            applicationId: "",
            dateFrom: dateFrom,
            dateTo: dateTo,
            applicationStatus: applicationStatus,
            onlyExpired: false
        }
    }

}