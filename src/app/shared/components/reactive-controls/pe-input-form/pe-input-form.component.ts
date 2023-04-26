import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { defaultExpr, defaultLength } from "src/app/shared/variables/pe-input-validations";
import { messages, ErrorMesssagesList } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-input-form",
    templateUrl: "./pe-input-form.component.html",
    styleUrls: ["./pe-input-form.component.scss"]
})
export class PeRInputComponent implements OnInit {
    
    public readonly errorMessages: ErrorMesssagesList = {...messages.formControlMessages.global, ...messages.formControlMessages.peInput};
    private _control!: FormControl;

    @Input() disabled: boolean = false;

    @Input() regExprValidation: RegExp = defaultExpr;

    @Input() maxLength: number = defaultLength;

    @Input() label: string = '';

    @Input() set control(abstractControl: AbstractControl){
        this._control = PEReactiveHelper.abstractControl.toFormControl(abstractControl);
    };

    get control(): FormControl {
        return this._control;
    }

    ngOnInit(): void {}
  
}