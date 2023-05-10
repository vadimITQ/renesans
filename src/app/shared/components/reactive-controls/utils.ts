import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";

export class PEReactiveHelper {
    
    static resetForm(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach(control => {
            control.setErrors(null);
        });
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

    static getValues<TValue extends { [ K in keyof TValue ]: AbstractControl } >(formGroup: FormGroup<TValue>): TValue | null {
        if (!formGroup) {
            return null;
        }
        return Object.keys(formGroup.controls).reduce((res: TValue, key) => {
            const controls = formGroup.controls;
            // res[key]
            
            return res;
        }, {} as TValue)
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