import { Component, EventEmitter, Input, Output } from '@angular/core';
import { defaultExpr, defaultLength } from '../../../variables/pe-input-validations';

@Component({
  selector: 'pe-input',
  templateUrl: './pe-input.component.html',
  styleUrls: ['./pe-input.component.scss'],
})
export class PeInputComponent {
  @Input() validationMessage: string | null = null;
  @Input() disabled: boolean = false;
  @Input() regExprValidation: RegExp = defaultExpr;
  @Input() maxLength: number = defaultLength;

  _value!: any;

  @Input() labelStyle!: { [key: string]: string };;
  @Input() label: string = '';
  @Input() get value() {
    return this._value;
  }
  @Output() valueChange = new EventEmitter();

  set value(newValue) {
    this._value = newValue;
    this.valueChange.emit(this.value);
  }
}
