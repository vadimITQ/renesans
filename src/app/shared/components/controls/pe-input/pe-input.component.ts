import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pe-input',
  templateUrl: './pe-input.component.html',
  styleUrls: ['./pe-input.component.scss'],
})
export class PeInputComponent {

  constructor() { }

  _value: string = '';

  @Input() label: string = '';
  @Input() get value() {
    return this._value;
  }
  @Output() ValueChange = new EventEmitter();

  set value(newValue) {
    this._value = newValue;
    this.ValueChange.emit(this.value);
  }

}
