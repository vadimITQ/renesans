
import { Validation } from "../../../../../shared/validation/types";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";

export class AntiFraudChecksValidation {

    static validateAnyField(filter: AntiFraudCheckFilter): Validation | null {
        let validation: Validation | null = null;
        if (!filter.paymentID && !filter.applicationID && !filter.dateTimeFrom && !filter.dateTimeTo){
            validation = {};
            validation['paymentID'] = '  ';
            validation['applicationID'] = '  ';
            validation['dateTimeFrom'] = '  ';
            validation['dateTimeTo'] = '  ';
            !filter.manualAntiFraudCheckStatusList || !filter.manualAntiFraudCheckStatusList.length ? validation['manualAntiFraudCheckStatusList'] = '  ': '';
            !filter.agedOnly ? validation['agedOnly'] = '  ': '';
        }
        return validation;
    }

}
