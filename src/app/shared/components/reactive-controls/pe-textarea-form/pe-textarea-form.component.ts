import { Component, Input } from "@angular/core";
import { defaultExpr, defaultLength } from "../../../variables/pe-input-validations";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-textarea-form",
    templateUrl: "./pe-textarea-form.component.html",
    styleUrls: ["./pe-textarea-form.component.scss"]
})
export class PeRTextareaComponent {
    
    constructor(){}
    
    private _control!: FormControl;

    @Input() disabled: boolean = false;

    @Input() regExprValidation: RegExp = defaultExpr;

    @Input() maxLength: number = defaultLength;

    @Input() label: string = '';

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