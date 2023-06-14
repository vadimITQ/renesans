import { Injectable } from "@angular/core";
import { ErrorMesssagesList, GlobalReactiveErrorsEnum, globalMessages } from "../../../../../shared/components/reactive-controls/global-error-messages";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { ISearchPaymentFilterForm } from "./search-payment-filters.types";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { DatePipe } from "@angular/common";

export enum ValidationErrorsEnum {
    SearchPaymentsFormNoValid = "searchPaymentsFormNoValid"
}

@Injectable({
    providedIn: "root"
})
export class SearchPaymentFilterValidation {

    constructor(
        private datePipe: DatePipe
    ){
      this.today.setHours(0, 0, 0, 0);
    }

    readonly today: Date = new Date();

    readonly messages: ErrorMesssagesList = {
      ...globalMessages.datesValidation,
      ...globalMessages.formValidations,
      [ValidationErrorsEnum.SearchPaymentsFormNoValid]: "  "
    }

    public validateFilter(group: FormGroup<ISearchPaymentFilterForm>, calledBySearchButton: boolean = false): ValidationErrors | null {

        group.markAllAsTouched();
    
        PEReactiveHelper.clearErrors(group);
    
        PEGlobalValidators.validateDates(group);
        PEGlobalValidators.validatePlannedDateLessToday(group.controls.plannedDate);
        
        if (calledBySearchButton) {
          this.validateOnEmpty(group);
        }
    
        return null;
    
    }

    private validateOnEmpty(group: FormGroup<ISearchPaymentFilterForm>): void {
      if (!group){
        return;
      }
      const {
        paymentID,
        applicationID,
        idPH,
        docID,
        linkedChequeId,
        docNum,
        account,
        chequeNumber,
        channelIP,
        userAgent,
        channelName,
        codeStatuses,
        parentType,
        dateTimeFrom,
        dateTimeTo,
        plannedDate,
        type
      } = group.controls;

      const emptyValidation = [
        dateTimeFrom.value,
        dateTimeTo.value,
        plannedDate.value,
        paymentID.value,
        applicationID.value,
        idPH.value,
        account.value,
        docID.value,
        linkedChequeId.value,
        docNum.value,
        chequeNumber.value,
        channelIP.value,
        userAgent.value,
        codeStatuses.value?.length,
        channelName.value?.length,
        parentType.value?.length
      ].every(v => !v);

      const noFilter: boolean = !group;
      
      if ((group.touched || group.dirty) && (noFilter || emptyValidation)){
        Object.keys(group.controls).forEach(key => {
          group.get(key)?.setErrors({ [GlobalReactiveErrorsEnum.EmptyError]: true });
        })
        group.setErrors(
          {
            [ValidationErrorsEnum.SearchPaymentsFormNoValid]: true,
            [GlobalReactiveErrorsEnum.ValidateOnEmpty]: true
          }
        );
      }
    }

}