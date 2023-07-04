import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMultiSelectData } from '../pe-multiselect/pe-multiselect.component';
import { MultiselectDatasetsService } from 'src/app/shared/services/multiselect-datasets.service';
import { IMultiCheckboxData } from '../pe-multi-checkbox/pe-multi-checkbox.component';

@Component({
  selector: 'pe-dropdown',
  templateUrl: './pe-dropdown.component.html',
  styleUrls: ['./pe-dropdown.component.scss'],
})
export class PeDropdownComponent {
  constructor(private datasetService: MultiselectDatasetsService) {}

  private _dataset!: IMultiSelectData[];
  private _selected!: IMultiCheckboxData;

  @Output() selectedChange: EventEmitter<IMultiCheckboxData> = new EventEmitter<IMultiCheckboxData>();
  @Output() selectValue: EventEmitter<IMultiCheckboxData> = new EventEmitter<IMultiCheckboxData>();
  @Output() showed: EventEmitter<void> = new EventEmitter<void>();

  @Input() placeholder: string = '';

  @Input() label: string = '';

  @Input() disabled: boolean = false;

  @Input() set dataset(dataSet: any) {
    // !! (dataSet: MultiselectDataSets)
    if (!!dataSet) {
      this._dataset = this.datasetService.getDataset(dataSet);
    } else {
      this._dataset = [];
    }
  }

  get dataset(): IMultiSelectData[] {
    return this._dataset;
  }

  @Input() get selected(): IMultiCheckboxData {
    return this._selected;
  }

  set selected(selected: IMultiCheckboxData) {
    this._selected = selected;
    this.selectedChange.emit(selected);
  }

  onShow(): void {
    this.showed.emit();
  }

  onChange(event: any): void {
    this.selectValue.emit(event.value);
  }
}
