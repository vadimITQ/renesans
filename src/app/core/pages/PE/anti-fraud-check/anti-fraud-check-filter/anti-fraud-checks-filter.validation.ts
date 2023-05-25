
import { Validation } from "../../../../../shared/validation/types";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";

export class AntiFraudChecksValidation {

    static validateAnyField(filter: AntiFraudCheckFilter): Validation | null {
        let validation: Validation | null = null;
        if (!filter.IdPE && !filter.applicationId && !filter.dateFrom && !filter.dateTo){
            validation = {};
            validation['IdPE'] = '  ';
            validation['applicationId'] = '  ';
            validation['dateFrom'] = '  ';
            validation['dateTo'] = '  ';
            !filter.applicationStatus || !filter.applicationStatus.length ? validation['applicationStatus'] = '  ': '';
            !filter.onlyExpired ? validation['onlyExpired'] = '  ': '';
        }
        return validation;
    }

}