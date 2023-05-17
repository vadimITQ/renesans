import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MultiSelect } from "primeng/multiselect";
import { MultiselectDatasetsService } from "src/app/shared/services/multiselect-datasets.service";
import { ValidationMessage } from "src/app/shared/validation/types";

export interface IMultiSelectData {
    value: string;
    label: string;
}

@Component({
    selector: "pe-multiselect",
    templateUrl: "./pe-multiselect.component.html",
    styleUrls: ["./pe-multiselect.component.scss"]
})
export class PeMuitiselectComponent implements OnInit {

    constructor(private multiselectDatasetsService: MultiselectDatasetsService){}

    private _selected!: IMultiSelectData[];
    private _dataset!: IMultiSelectData[];
    private _labelStyle!: {[key: string]: string};

    @ViewChild("labelRef", { static: true }) labelRef!: ElementRef;
    @ViewChild("multiselectRef", { static: true }) multiselectRef!: MultiSelect;

    @Output() selectedChange = new EventEmitter<IMultiSelectData[]>();

    @Input() get selected() {
        return this._selected;
    }

    set selected(value: IMultiSelectData[]) {
        this._selected = value;
        this.selectedChange.next(value);
    }

    @Input() label: string = "";

    @Input() placeholder: string = "";

    @Input() set labelStyle(style: {[key: string]: string}) {
        this._labelStyle = style;
        setTimeout(() => {
            this.fixMultiselectOverflowingProgrammatically(); 
        });
    };

    get labelStyle(): {[key: string]: string}{
        return this._labelStyle;
    }

    @Input() validationMessage!: ValidationMessage;

    @Input() set dataset(dataSet: any){ // !! (dataSet: MultiselectDataSets)
        if (!!dataSet){
            this._dataset = this.multiselectDatasetsService.getDataset(dataSet);
        }
        else {
            this._dataset = [];
        }
    };

    @Input() displayType: string = "chip";

    get dataset(): IMultiSelectData[]{
        return this._dataset;
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

    ngOnInit(): void { 
        this.fixMultiselectOverflowingProgrammatically();   
    }

    private fixMultiselectOverflowingProgrammatically() {
        setTimeout(() => { 
            const label = this.labelRef?.nativeElement as HTMLLabelElement;
            if (!label){
                return;
            }
            const multiselectContainer = this.multiselectRef.containerViewChild.nativeElement as HTMLElement;
            const labelWidth = label.offsetWidth;
            multiselectContainer.style.maxWidth = `calc(100% - ${ labelWidth }px)`;
        });
    }

}