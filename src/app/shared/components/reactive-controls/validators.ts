import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors, FormControl } from "@angular/forms";
import { IMultiCheckboxData } from "./pe-multi-checkbox-form/pe-r-multi-checkbox/pe-r-multi-checkbox.component";
import { PEReactiveHelper } from "./utils";
import { IMultiSelectData } from "../controls/pe-multiselect/pe-multiselect.component";
import { FormGroupManualChecksFilter } from "./reactive-forms-modals";

export class PEValidators {
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