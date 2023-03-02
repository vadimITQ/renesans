import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format, isValid, parse } from 'date-fns';
import { ValidationMessage } from '../../../validation/types';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() showTime: boolean = true;
  @Input() validationMessage: ValidationMessage = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;

  _date: string | null = null;

  @Input() get date(): string | null {
    return this._date;
  }
  set date(newValue) {
    this._date = newValue;

    this.dateChange.emit(newValue);
  }

  @Output() dateChange = new EventEmitter<string | null>();

  ngOnInit() {
    if (!this._date) {
      return;
    }
    const currentDate = this.parseDate(this._date);

    this.dateValue = currentDate;
    this.timeValue = currentDate;
  }

  _dateValue: Date | null = null;

  get dateValue() {
    return this._dateValue;
  }

  set dateValue(newValue) {
    this._dateValue = newValue;

    if (!this._timeValue) {
      this._timeValue = newValue;
    }
    const formattedDate = DatePickerComponent.prepareDates(newValue, this._timeValue);
    if (formattedDate) {
      this.date = formattedDate;
    }
  }

  _timeValue: Date | null = null;

  get timeValue() {
    return this._timeValue;
  }

  set timeValue(newValue) {
    this._timeValue = newValue;

    if (!this._dateValue) {
      this._dateValue = newValue;
    }

    const formattedDate = DatePickerComponent.prepareDates(this._dateValue, newValue);
    if (formattedDate) {
      this.dateChange.emit(formattedDate);
    }
  }

  private static prepareDates(date: Date | null, time: Date | null): string | null {
    const dateArr = [];
    if (isValid(date)) {
      dateArr.push(format(date!, 'dd/MM/yyyy'));
    }

    if (isValid(time)) {
      dateArr.push(format(time!, 'HH:mm'));
    }

    return dateArr.join(' ');
  }

  private parseDate(dateString: string): Date {
    const parsedDateString = this.showTime ? dateString : dateString.split(' ')[0];
    const dateFormat = this.showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy';
    return parse(parsedDateString, dateFormat, new Date());
  }
}
