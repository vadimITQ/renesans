import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IMultiCheckboxData {
  value: string;
  label: string;
}

@Component({
  selector: 'pe-multi-checkbox',
  templateUrl: './pe-multi-checkbox.component.html',
  styleUrls: ['./pe-multi-checkbox.component.scss'],
})
export class PeMultiCheckboxComponent {
  @Input() title: string = '';
  @Input() vertical: boolean = false;
  @Input() values: IMultiCheckboxData[] = [];
  _value: string[] = [];
  @Input() get value() {
    return this._value;
  }
  @Output() valueChange = new EventEmitter();

  set value(newValue) {
    this._value = newValue;
    this.valueChange.emit(this.value);
  }
}
