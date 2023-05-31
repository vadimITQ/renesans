import { AbstractControl, FormGroup, ValidationErrors, FormControl } from "@angular/forms";
import { IMultiCheckboxData } from "./pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component";
import { FormGroupManualChecksFilter, SearchPaymentChecksFilter } from "./reactive-forms-modals";
import { PEReactiveHelper } from "./utils";
import { ManualChecksFilter } from "../../models/manual-checks-models";
import { ValidationErrorsEnum } from "src/app/core/pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.validation";


export class PEGlobalValidators {

    public static validateDates(group: FormGroup<ManualChecksFilter> | FormGroup<SearchPaymentChecksFilter>): void {
        if (PEReactiveHelper.isFormGroup(group)){
          const dateFrom = group.controls.dateTimeFrom;
          const dateTo = group.controls.dateTimeTo;
          const dateFromValue = dateFrom.value as Date;
          const dateToValue = dateTo.value as Date;
          const timeValueFrom = dateFromValue?.getTime() ?? 0;
          const timeValueTo = dateToValue?.getTime() ?? 0;
          const range: number = (timeValueTo - timeValueFrom) / (1000 * 60 * 60 * 24);
    
          if (!dateFromValue && !dateToValue){
            dateFrom.setErrors(null);
            dateTo.setErrors(null);
            return;
          }
    
          if (!dateFromValue || !dateToValue) {
            !dateFromValue ? dateFrom.setErrors({[ValidationErrorsEnum.Required]: true }): "";
            !dateToValue ? dateTo.setErrors({[ValidationErrorsEnum.Required]: true }): "";
            group.setErrors({
              [ValidationErrorsEnum.ManualChecksFormNoValid]: {
                value: true
              },
              [ValidationErrorsEnum.Required]: {
                value: true
              }
            });
            return;
          }
          
          if (timeValueFrom > timeValueTo){
            dateFrom.setErrors({[ValidationErrorsEnum.DateFromMoreThanDateTo]: true});
            dateTo.setErrors({[ValidationErrorsEnum.EmptyError]: true })
            group.setErrors({
              [ValidationErrorsEnum.ManualChecksFormNoValid]: {
                value: true
              },
              [ValidationErrorsEnum.DateFromMoreThanDateTo]: {
                value: true
              }
            });
            return;
          }
    
          if (range > 40){
            dateFrom.setErrors({[ValidationErrorsEnum.EmptyError]: true })
            dateTo.setErrors({[ValidationErrorsEnum.DatesRangeLimit]: true })
            group.setErrors({
              [ValidationErrorsEnum.ManualChecksFormNoValid]: {
                value: true
              },
              [ValidationErrorsEnum.DatesRangeLimit]: {
                value: true
              }
            });
            return;
          }
    
        }
    
      }


    static ManualChecksFilterValidators = {
        GlobalValidators: { },
        PeInputValidators: {
            FormGroupValidators: {
                Required: () => (formGroup: FormGroup<FormGroupManualChecksFilter>): ValidationErrors | null => {
                    // formGroup
                    
                    const [
                        paymentIDValue,
                        applicationIDValue,
                        paymentHubPaymentIdValue,
                        accountValue,
                        dateStartValue,
                        multiselectValue,
                        multicheckboxValue
                    ] = [
                        formGroup.controls.account.value,
                        formGroup.controls.applicationID.value,
                        formGroup.controls.paymentID.value,
                        formGroup.controls.account.value,
                        formGroup.controls.dateStart.value,
                        formGroup.controls.multiselect.value,
                        formGroup.controls.multicheckbox.value
                    ];

                    if (
                        !paymentIDValue || 
                        !applicationIDValue || 
                        !paymentHubPaymentIdValue || 
                        !accountValue || 
                        !dateStartValue || 
                        !(!!multiselectValue && multiselectValue.length > 0) ||
                        !(multicheckboxValue?.every(box => box.value === true))
                    ){
                        return {required: {value: true}};
                    }
                    else {
                        return null;
                    }
                }
            },
            FormControlValidators: {
                Required: (abstractControl: AbstractControl): ValidationErrors | null => {
                    const formControl = abstractControl as FormControl;
                    if (!formControl?.value){
                        return {required: {value: true}};
                    }
                    else{ 
                        return null;
                    }
                },
                PeMultiselect: {
                    Required: (abstractControl: AbstractControl): ValidationErrors | null => {
                        const formControl = abstractControl as FormControl;
                        if (formControl?.value?.length > 0){
                            return null;
                        }
                        else{ 
                            return {required: {value: true}};
                        }
                    }
                },
                PeMultiCheckbox: {
                    AllTrue: (AbstractControl: AbstractControl): ValidationErrors | null => {
                        const formControl = AbstractControl as FormControl;
                        const boxes = formControl?.value as IMultiCheckboxData[];
                        if (boxes.every(box => box.value === true)){
                            return null;
                        }
                        else{
                            return {allTrue: {value: true}};
                        }
                    }
                }
            }
        }
    }
}