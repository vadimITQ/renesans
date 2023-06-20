
import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { PEReactiveHelper } from "../utils";
import { ErrorMesssagesList, globalMessages } from "../global-error-messages";

@Component({
    selector: "pe-checkbox-form",
    templateUrl: "./pe-checkbox-form.component.html",
    styleUrls: ["./pe-checkbox-form.component.scss"]
})
export class PeCheckboxFormComponent {

    constructor(){}

    _control!: FormControl;

    @Input() label: string = '';
    @Input() errorMessages: ErrorMesssagesList = globalMessages.checkboxValidation;
    
    @Input() set disabled(value: boolean) {
        if (value === true){
            this.control.disable();
        }
        else {
            this.control.enable();
        }
    }

    @Input() set control(abstractControl: AbstractControl | FormControl) {
        if (PEReactiveHelper.isFormControl(abstractControl)){
            this._control = abstractControl;
        }
    };

    get control(): FormControl {
        return this._control;
    }

    get hasError(): boolean {
        return (this.control.invalid && (this.control.dirty || this.control.touched)) && !!this.control.errors;
    }

}