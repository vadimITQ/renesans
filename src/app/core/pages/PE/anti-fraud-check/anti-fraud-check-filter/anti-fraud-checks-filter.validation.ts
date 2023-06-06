
import { ErrorMesssagesList } from "src/app/shared/components/reactive-controls/global-error-messages";
import { Validation } from "../../../../../shared/validation/types";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";
import { Injectable } from "@angular/core";
import { globalMessages, GlobalReactiveErrorsEnum} from "src/app/shared/components/reactive-controls/global-error-messages";

export enum ValidationErrorsEnum {
    ValidateOnEmpty = "validateOnEmpty",
    Required = "required",
    DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
    DatesRangeLimit = "datesRangeLimit",
    EmptyError = "emptyError",
    AntiFraudChecksFilterNoValid = "antiFraudChecksNoValid"
}

@Injectable({
    providedIn: 'root'
})
export class AntiFraudChecksValidation {

    readonly messages: ErrorMesssagesList = globalMessages.datesValidation;

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