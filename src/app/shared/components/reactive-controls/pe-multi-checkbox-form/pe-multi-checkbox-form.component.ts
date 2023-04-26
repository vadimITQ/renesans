
import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList, messages } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-multi-checkbox-form",
    templateUrl: "./pe-multi-checkbox-form.component.html",
    styleUrls: ["./pe-multi-checkbox-form.component.scss"]
})
export class PeRMultiCheckboxComponent {

    constructor(){ }

    public readonly errorMessages: ErrorMesssagesList = messages.formControlMessages.peMulticheckbox;
    _control!: FormControl;

    @Input() title: string = '';
    @Input() horizontal: boolean = false;
    
    @Input() set control(abstractControl: AbstractControl) {
        this._control = PEReactiveHelper.abstractControl.toFormControl(abstractControl);
    }

    get control(): FormControl {
        return this._control;
    }

}