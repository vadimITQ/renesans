import { Component, Input } from "@angular/core";
import { defaultExpr, defaultLength } from "../../../variables/pe-input-validations";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList, messages } from "../global-error-messages";

@Component({
    selector: "pe-r-textarea",
    templateUrl: "./pe-r-textarea.component.html",
    styleUrls: ["./pe-r-textarea.component.scss"]
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
      this._control = abstractControl as FormControl;
    }

    get control(): FormControl {
      return this._control;
    }

}