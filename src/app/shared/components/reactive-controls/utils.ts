import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export class PEReactiveHelper {
    
    static clearErrors(formGroup: FormGroup): void {
        formGroup.setErrors(null);
        Object.values(formGroup.controls).forEach(control => {
            control.setErrors(null);
        });
    }

    static resetForm(formGroup: FormGroup): void {
        this.clearErrors(formGroup);
        formGroup.reset();
    }

    static triggerControlsValidations(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(key => {
            const control = formGroup.get(key);
            if (control){
              control.markAsTouched();
              control.updateValueAndValidity();
            }
        });
    }

    static isFormControl(abstractControl: AbstractControl | FormControl): abstractControl is FormControl {
        if (abstractControl instanceof FormControl){
            return true;
        }
        else {
            return false;
        }
    }

    static isFormGroup(abstractControl: AbstractControl | FormGroup | any): abstractControl is FormGroup {
        if (abstractControl instanceof FormGroup){
            return true;
        }
        else {
            return false;
        }
    }

}