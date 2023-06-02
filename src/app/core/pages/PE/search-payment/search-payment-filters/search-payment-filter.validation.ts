import { Injectable } from "@angular/core";
import { ErrorMesssagesList } from "../../../../../shared/components/reactive-controls/global-error-messages";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { ISearchPaymentFilterForm } from "./search-payment-filters.types";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PEGlobalValidators } from "src/app/shared/components/reactive-controls/validations";
import { ToastService } from "src/app/shared/services/toast.service";
import { DatePipe } from "@angular/common";

export enum ValidationErrorsEnum {
    ValidateOnEmpty = "validateOnEmpty",
    ValidateOnEmptyControl = "validateOnEmptyControl",
    Required = "required",
    DateFromMoreThanDateTo = "dateFromMoreThanDateTo",
    DatesRangeLimit = "datesRangeLimit",
    EmptyError = "emptyError",
    SearchPaymentsFormNoValid = "searchPaymentsFormNoValid",
    PlannedDateNoValid = "plannedDateNoValid"
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
      [ValidationErrorsEnum.SearchPaymentsFormNoValid]: " ",
      [ValidationErrorsEnum.ValidateOnEmpty]: "Заполните хотя бы одно из полей фильтров или укажите интервал дат",
      [ValidationErrorsEnum.ValidateOnEmptyControl]: "  ",
      [ValidationErrorsEnum.Required]: "Поле обязательно к заполнению",
      [ValidationErrorsEnum.DateFromMoreThanDateTo]: "«Дата/Время с» превышает «Дата/Время по»",
      [ValidationErrorsEnum.DatesRangeLimit]: "Диапазон дат не должен превышать 40 дней",
      [ValidationErrorsEnum.EmptyError]: "  ",
      [ValidationErrorsEnum.PlannedDateNoValid]: `Не должно быть раньше, чем ${ this.datePipe.transform(this.today, "dd/MM/yyyy") }` 
    }

    public validateFilter(group: FormGroup<ISearchPaymentFilterForm>, triggeredBySubmitButton: boolean = false): ValidationErrors | null {

        group.markAllAsTouched();
    
        PEReactiveHelper.clearErrors(group);
    
        PEGlobalValidators.validateDates(group);

        this.validatePlannedDate(group);
        
        if (triggeredBySubmitButton) {
          this.validateOnEmpty(group);
        }
    
        return null;
    
    }

    validatePlannedDate(group: FormGroup<ISearchPaymentFilterForm>) {
      if (!group){
        return;
      }

      const plannedDate = group.controls.plannedDate.value;

      if (!plannedDate){
        return;
      }

      if (this.today.getTime() > plannedDate.getTime()){
        group.controls.plannedDate.setErrors({
          [ValidationErrorsEnum.PlannedDateNoValid]: true
        });
        group.setErrors({
          [ValidationErrorsEnum.SearchPaymentsFormNoValid]: {value: true},
          [ValidationErrorsEnum.PlannedDateNoValid]: {value: true}
        });
      }

    }

    validateOnEmpty(group: FormGroup<ISearchPaymentFilterForm>) {
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
        parentType
      } = group.controls;

      const noFilter: boolean = !group;
      const filterHasDates: boolean =  !!group.controls.dateTimeFrom.value || !!group.controls.dateTimeTo.value || !!group.controls.plannedDate.value;
      const filterHasId: boolean = !!paymentID.value || !!applicationID.value || !!idPH.value || !!account.value
        || !!docID.value || !!linkedChequeId.value || !!docNum.value || !!chequeNumber.value || !!channelIP.value || !!userAgent.value;
      const filterHasSelected = !!channelName.value.length || !!codeStatuses.value.length || !!parentType.value.length;

      if ((group.touched || group.dirty) && (noFilter || (!filterHasDates && !filterHasId && !filterHasSelected))){
        Object.keys(group.controls).forEach(key => {
          group.get(key)?.setErrors({ [ValidationErrorsEnum.EmptyError]: true });
        })
        group.setErrors(
          {
            [ValidationErrorsEnum.SearchPaymentsFormNoValid]: {
              value: true
            },
            [ValidationErrorsEnum.ValidateOnEmpty]: {
              value: true
            }
          }
        );
      }
    }

}