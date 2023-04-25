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

    _dateControl: FormControl = new FormControl();
    errorMessages: ErrorMesssagesList = messages.formControlMessages.global;
    dateControlSubscribtion!: Subscription;
    timeControlSubscribtion!: Subscription;

    @Input() set control(abstractControl: AbstractControl) {
        this._dateControl = abstractControl as FormControl;
    }
    
    ngOnDestroy(): void {
        this.dateControlSubscribtion?.unsubscribe();
        this.timeControlSubscribtion?.unsubscribe();
    }

    ngOnInit(): void { 
        this.dateControlSubscribtion = this._dateControl.valueChanges.subscribe(
            () => {
                const iso = (this._dateControl.value as Date).toISOString();
                this.listenISODate.emit(iso);
            }
        );
    }

}