import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors, FormControl } from "@angular/forms";

export class PEValidators {
    static ManualChecksFilterValidators = {
        PeInputValidators: {
            FormGroupValidators: {
                Required: (formGroup: FormGroup): ValidationErrors | null => {
                    // formGroup
                    const paymentIDRequired = !!formGroup.controls["paymentID"]?.value;
                    const applicationIDRequired = !!formGroup.controls["applicationID"]?.value;
                    const paymentHubPaymentIdRequired = !!formGroup.controls["paymentHubPaymentId"]?.value;
                    const accountRequired = !!formGroup.controls["account"]?.value;
                    const dateStartRequired = !!formGroup.controls["dateStart"]?.value;
                    const multiselectRequired = formGroup.controls["multiselect"]?.value?.length > 0;
                    if (
                        !paymentIDRequired || 
                        !applicationIDRequired || 
                        !paymentHubPaymentIdRequired || 
                        !accountRequired || 
                        !dateStartRequired || 
                        !multiselectRequired
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
                }
            }
        }
    }
}