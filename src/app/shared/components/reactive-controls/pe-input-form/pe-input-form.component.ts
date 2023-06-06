import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { defaultExpr, defaultLength } from "src/app/shared/variables/pe-input-validations";
import { ErrorMesssagesList } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-input-form",
    templateUrl: "./pe-input-form.component.html",
    styleUrls: ["./pe-input-form.component.scss"]
})
export class PeRInputComponent implements OnInit {
    
    private _control!: FormControl;

    @Input() disabled: boolean = false;

    @Input() regExprValidation: RegExp = defaultExpr;

    @Input() maxLength: number = defaultLength;

    @Input() label: string = '';

    @Input() errorMessages: ErrorMesssagesList = {};

    @Input() set control(abstractControl: AbstractControl | FormControl){
        if (PEReactiveHelper.isFormControl(abstractControl)){
            this._control = abstractControl;
        }
    };

    get control(): FormControl {
        return this._control;
    }

    ngOnInit(): void {}
  
}