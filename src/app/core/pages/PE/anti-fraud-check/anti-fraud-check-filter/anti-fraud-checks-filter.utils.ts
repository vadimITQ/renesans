
import { subDays } from "date-fns";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";

export class AntiFraudChecksFilterUtils {

    static getDefaultFilter(): AntiFraudCheckFilter {

        const dateTo = new Date();
        const dateFrom = subDays(dateTo, 3);
        
        return  {
            IdPE: "",
            applicationId: "",
            dateFrom: dateFrom,
            dateTo: dateTo,
            applicationStatus: [],
            onlyExpired: false
        }
    }

}