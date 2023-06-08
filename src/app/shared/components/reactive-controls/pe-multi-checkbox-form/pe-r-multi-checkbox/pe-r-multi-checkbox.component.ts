import { Component, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

export interface IMultiCheckboxData {
    value: boolean;
    label: string;
}

@Component({
    selector: "pe-r-multi-checkbox",
    templateUrl: "./pe-r-multi-checkbox.component.html",
    styleUrls: ["./pe-r-multi-checkbox.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: PeRMultiCheckboxForm
        }
    ]
})
export class PeRMultiCheckboxForm implements ControlValueAccessor {

    constructor(){}

    values: IMultiCheckboxData[] = [];
    touched: boolean = false;
    
    onTouch = () => {};
    onChange = (values: IMultiCheckboxData[]) => {};

    @Input() title: string = '';
    @Input() horizontal: boolean = false;
    @Input() hasError: boolean = false;

    writeValue(values: IMultiCheckboxData[]): void {
        this.values = values;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    onValueChanged(){
        this.markAsTouched();
        this.onChange([...this.values]);
    }

    markAsTouched(){
        if (!this.touched){
            this.onTouch();
            this.touched = true;
        }
    }

}