import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pe-input',
  templateUrl: './pe-input.component.html',
  styleUrls: ['./pe-input.component.scss'],
})
export class PeInputComponent {
  @Input() label: string = '';

  _value: string = '';
  @Input()
  get value() {
    return this._value;
  }

  @Output() valueChange = new EventEmitter();

  set value(newValue) {
    this._value = newValue;
    this.valueChange.emit(this.value);
  }
}
