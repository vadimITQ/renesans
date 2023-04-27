import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export class PEReactiveHelper {

    static abstractControl = {
        toFormControl: (abstractC\ontrol: AbstractControl): FormControl => {
            return abstractControl as FormControl;
        },
        toFormControls: (...abstractControls: AbstractControl[]): FormControl[] => {
            return abstractControls.map(abstractControl => abstractControl as FormControl);
        },
        toFormGroup: (abstractControl: AbstractControl): FormGroup => {
            return abstractControl as FormGroup;
        },
        getValue: <TValue>(abstractControl: AbstractControl): TValue | null => {
            return abstractControl?.value ?? null;
        },
        getValues: (...abstractControls: AbstractControl[]): any[] => {
            return (abstractControls ?? []).map(abstractControl => abstractControl?.value);
        }
    };

    static formGroup = {
        getControls: (formGroup: FormGroup, ...controlNames: string[]): AbstractControl[] => {
            if (!formGroup){
                return [];
            }
            const controls = controlNames.map(controlName => formGroup.controls[controlName]);
            return controls;
        }
    }

    static formControl = {
        getValue: <T>(formControl: FormControl): T => {
            return formControl?.value ?? null;
        },
        getValues: (...formControls: FormControl[]): any[] => {
            return formControls?.map(formControl => formControl?.value ?? null) ?? null;
        }
    }

}