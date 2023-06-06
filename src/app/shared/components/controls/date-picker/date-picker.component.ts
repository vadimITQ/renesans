import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ValidationMessage } from '../../../validation/types';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerHelper } from './date-picker-helper';
import { DateHelper } from 'src/app/shared/classes/date-helper';

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

  @Output() getISODate: EventEmitter<Date | null> = new EventEmitter<Date | null>();
  private _date: Date | null = null;

  onChange = (_: Date | null) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void { 
    this.onTouched = fn;
  }

  writeValue(obj: Date | null): void {
      this.date = obj;
  }

  set date(newDate: Date | null) {
    this._date = newDate;
    this.onChange(this._date);
  }

  get date(): Date | null {
    return this._date;
  }

}
