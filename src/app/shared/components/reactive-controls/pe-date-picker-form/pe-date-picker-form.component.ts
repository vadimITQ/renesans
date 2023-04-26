import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { messages } from "../global-error-messages";
import { ErrorMesssagesList } from "../global-error-messages";
import { Subscription } from "rxjs";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-date-picker-form",
    templateUrl: "./pe-date-picker-form.component.html",
    styleUrls: ["./pe-date-picker-form.component.scss"]
})
export class PeRDatePickerComponent implements OnInit, OnDestroy {

    @Input() label: string = '';
    @Input() showTime: boolean = true;
    @Input() disabled: boolean = false;
    @Input() minDate: Date | null = null;
    @Input() maxDate: Date | null = null;
    @Input() labelStyle?: { [styleKey: string]: string };
    @Output() listenISODate: EventEmitter<string | null> = new EventEmitter<string | null>();

    public readonly errorMessages: ErrorMesssagesList = messages.formControlMessages.global;
    private _control: FormControl = new FormControl();
    private dateControlSubscribtion!: Subscription;

    @Input() set control(abstractControl: AbstractControl) {
        this._control = PEReactiveHelper.abstractControl.toFormControl(abstractControl);
    }

    get control(): FormControl {
        return this._control;
    }
    
    ngOnDestroy(): void {
        this.dateControlSubscribtion?.unsubscribe();
    }

    ngOnInit(): void {
        this.dateControlSubscribtion = this.control.valueChanges.subscribe(
            () => {
                const iso = (this.control.value as Date)?.toISOString() ?? null;
                this.listenISODate.emit(iso);
            }
        );   
    }

}