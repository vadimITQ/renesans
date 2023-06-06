
import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-multi-checkbox-form",
    templateUrl: "./pe-multi-checkbox-form.component.html",
    styleUrls: ["./pe-multi-checkbox-form.component.scss"]
})
export class PeRMultiCheckboxComponent {

    constructor(){ }

    _control!: FormControl;

    @Input() title: string = '';
    @Input() horizontal: boolean = false;
    @Input() errorMessages: ErrorMesssagesList = {};
    
    @Input() set control(abstractControl: AbstractControl | FormControl) {
        if (PEReactiveHelper.isFormControl(abstractControl)){
            this._control = abstractControl;
        }
    }

    get control(): FormControl {
        return this._control;
    }

}