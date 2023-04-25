import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { messages } from "../global-error-messages";
import { ErrorMesssagesList } from "../global-error-messages";
import { Subscription } from "rxjs";

@Component({
    selector: "pe-r-date-picker",
    templateUrl: "./pe-r-date-picker.component.html",
    styleUrls: ["./pe-r-date-picker.component.scss"]
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
    private timeControlSubscribtion!: Subscription;

    @Input() set control(abstractControl: AbstractControl) {
        this._control = abstractControl as FormControl;
    }

    get control(): FormControl {
        return this._control;
    }
    
    ngOnDestroy(): void {
        this.dateControlSubscribtion?.unsubscribe();
        this.timeControlSubscribtion?.unsubscribe();
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