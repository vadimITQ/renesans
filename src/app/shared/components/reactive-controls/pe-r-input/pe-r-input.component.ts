import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { defaultExpr, defaultLength } from "src/app/shared/variables/pe-input-validations";
import { messages, ErrorMesssagesList } from "../global-error-messages";

@Component({
    selector: "pe-r-input",
    templateUrl: "./pe-r-input.component.html",
    styleUrls: ["./pe-r-input.component.scss"]
})
export class PeRInputComponent implements OnInit {
    
    _value!: any;
    _control!: FormControl;

    @Input() disabled: boolean = false;

    @Input() regExprValidation: RegExp = defaultExpr;

    @Input() maxLength: number = defaultLength;

    @Input() label: string = '';

    @Input() set control(abstractControl: AbstractControl){
        this._control = abstractControl as FormControl;
    };

    public readonly errorMessages: ErrorMesssagesList = {...messages.formControlMessages.global, ...messages.formControlMessages.peInput};

    ngOnInit(): void {}
  
}