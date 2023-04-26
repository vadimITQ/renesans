import { Component, Input } from "@angular/core";
import { defaultExpr, defaultLength } from "../../../variables/pe-input-validations";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList, messages } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-textarea-form",
    templateUrl: "./pe-textarea-form.component.html",
    styleUrls: ["./pe-textarea-form.component.scss"]
})
export class PeRTextareaComponent {
    
    constructor(){}
    
    public readonly errorMessages: ErrorMesssagesList = {...messages.formControlMessages.global, ...messages.formControlMessages.peInput};
    private _control!: FormControl;

    @Input() disabled: boolean = false;

    @Input() regExprValidation: RegExp = defaultExpr;

    @Input() maxLength: number = defaultLength;

    @Input() label: string = '';

    @Input() set control(abstractControl: AbstractControl) {
      this._control = PEReactiveHelper.abstractControl.toFormControl(abstractControl);
    }

    get control(): FormControl {
      return this._control;
    }

}