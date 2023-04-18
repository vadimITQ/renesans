import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MultiselectDataSets } from "src/app/shared/enums/datasets.enums";
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

    ngOnInit(): void { }

}