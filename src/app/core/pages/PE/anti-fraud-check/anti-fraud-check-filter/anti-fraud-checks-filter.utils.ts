
import { subDays } from "date-fns";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";
import {IGetApplicationsListPayload} from "../../../../../shared/types/get-applications-list";
import {DatePickerHelper} from "../../../../../shared/components/controls/date-picker/date-picker-helper";
import {antiFraudApplicationStatuses} from "./anti-fraud-checks-filter.constants";

export class AntiFraudChecksFilterUtils {

    static getDefaultFilter(): AntiFraudCheckFilter {

        const dateTimeTo = new Date();
        const dateTimeFrom = subDays(dateTimeTo, 3);
        const manualAntiFraudCheckStatusList: IMultiSelectData[] = [antiFraudApplicationStatuses[0]];

        return  {
          paymentID: "",
          applicationID: "",
          dateTimeFrom,
          dateTimeTo,
          manualAntiFraudCheckStatusList,
          agedOnly: false
        }
    }


    static prepareAntiFraudFilters({dateTimeFrom, dateTimeTo, paymentID, applicationID, manualAntiFraudCheckStatusList, agedOnly}:AntiFraudCheckFilter): IGetApplicationsListPayload {
      return {
        dateTimeFrom: !!dateTimeFrom ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.toISOString()) : undefined,
        dateTimeTo: !!dateTimeTo ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.toISOString()) : undefined,
        paymentID: !!paymentID ? paymentID : undefined,
        applicationID: !!applicationID ? applicationID : undefined,
        manualAntiFraudCheckStatusList: manualAntiFraudCheckStatusList?.length > 0 ? manualAntiFraudCheckStatusList.map(v => v.value) : undefined,
        agedOnly,
      };
    }
}
