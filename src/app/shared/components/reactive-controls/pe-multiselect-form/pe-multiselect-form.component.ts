import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MultiselectDatasetsService } from "src/app/shared/services/multiselect-datasets.service";
import { IMultiSelectData } from "../../controls/pe-multiselect/pe-multiselect.component";
import { MultiSelect } from "primeng/multiselect";
import { ValidationMessage } from "src/app/shared/validation/types";
import { PeRMultiselectHelper } from "./pe-multiselect-form-helper";
import { AbstractControl, FormControl } from "@angular/forms";
import { ErrorMesssagesList, messages } from "../global-error-messages";
import { PEReactiveHelper } from "../utils";

@Component({
    selector: "pe-multiselect-form",
    templateUrl: "./pe-multiselect-form.component.html",
    styleUrls: ["./pe-multiselect-form.component.scss"]
})
export class PeRMultiselectComponent {

    constructor(private multiselectDatasetsService: MultiselectDatasetsService){}

    private _dataset!: IMultiSelectData[];
    private _labelStyle!: {[key: string]: string};
    private _control!: FormControl;

    @ViewChild("labelRef", { static: true }) labelRef!: ElementRef;
    @ViewChild("multiselectRef", { static: true }) multiselectRef!: MultiSelect;
    @Input() label: string = "";
    @Input() displayType: string = "chip";
    @Input() placeholder: string = "";
    @Input() validationMessage!: ValidationMessage;
    @Input() errorMessages: ErrorMesssagesList = messages.formControlMessages.global;

    @Input() set dataset(dataSet: any){ // !! (dataSet: MultiselectDataSets)
        if (!!dataSet){
            this._dataset = this.multiselectDatasetsService.getDataset(dataSet);
        }
        else {
            this._dataset = [];
        }
    };

    @Input() set labelStyle(style: {[key: string]: string}) {
        this._labelStyle = style;
        setTimeout(() => {
            PeRMultiselectHelper.fixMultiselectOverflowingProgrammatically(this.labelRef, this.multiselectRef); 
        });
    };

    @Input() set control(control: AbstractControl | FormControl){
        if (PEReactiveHelper.isFormControl(control)){
            this._control = control;
        }
    }

    get dataset(): IMultiSelectData[]{
        return this._dataset;
    }

    get labelStyle(): {[key: string]: string}{
        return this._labelStyle;
    }

    get labelWidth(): string {
        let result = "";
        const width = (this.labelRef.nativeElement as HTMLLabelElement)?.offsetWidth;
        if (!!width){
            result = width + 'px';
        }
        else {
            result = '0px';
        }
        return result;
    }

    get control(): FormControl {
       return this._control; 
    }

    ngOnInit(): void { 
        PeRMultiselectHelper.fixMultiselectOverflowingProgrammatically(
            this.labelRef, 
            this.multiselectRef
        );
        setTimeout(() => {
            this.control.valueChanges.subscribe(val => { }); 
        });
    }
}