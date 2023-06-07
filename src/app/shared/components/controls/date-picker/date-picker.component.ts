import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationMessage } from '../../../validation/types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() showTime: boolean = true;
  @Input() disabled: boolean = false;
  @Input() validationMessage: ValidationMessage = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() labelStyle?: { [styleKey: string]: string };

  private _date: Date | null = null;

  @Output() DateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public set date(newDate: Date | null) {
    this._date = newDate;
    this.onChange(this._date);
    this.DateChanged.emit(true);
  }

  public get date(): Date | null {
    return this._date;
  }

  onChange = (_: Date | null) => { };
  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: Date | null): void {
    this.date = obj;
  }

}
