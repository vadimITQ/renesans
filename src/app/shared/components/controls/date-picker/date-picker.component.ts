import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { add, addHours, format, formatISO, isValid, parse, parseISO } from 'date-fns';
import { ValidationMessage } from '../../../validation/types';
import { DatePickerHelper } from './date-picker-helper';
import { dateFormat, dateFormatWithTime, timeFormat } from './date-picker.constants';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() showTime: boolean = true;
  @Input() disabled: boolean = false;
  @Input() validationMessage: ValidationMessage = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() labelStyle?: { [styleKey: string]: string };

  _date: string | null = null;

  @Input() set date(newValue) {
    this._date = newValue;
    this.dateValue = DatePickerHelper.convertToDate(newValue);
    this.dateChange.emit(newValue);

    if (!this._date) {
      this.dateValue = null;
      this.timeValue = null;
      return;
    }
    const currentDate = this.parseDate(this._date);

    this.dateValue = currentDate;
    this.timeValue = currentDate;
  }

  get date(): string | null {
    return this._date;
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

    if (!this._timeValue || !newValue) {
      this._timeValue = newValue;
    }
    const formattedDate = this.prepareDates(newValue, this._timeValue);
    this.dateChange.emit(formattedDate);
  }

  _timeValue: Date | null = null;

  get timeValue() {
    return this._timeValue;
  }

  set timeValue(newValue) {
    this._timeValue = newValue;

    if (!this._dateValue || !newValue) {
      this._dateValue = newValue;
    }

    const formattedDate = this.prepareDates(this._dateValue, newValue);
    this.dateChange.emit(formattedDate);
  }

  private prepareDates(date: Date | null, time: Date | null): string | null {
    const dateArr = [];
    if (isValid(date)) {
      dateArr.push(format(date!, dateFormat));
    }

    if (isValid(time) && this.showTime) {
      dateArr.push(format(time!, timeFormat));
    }

    const dateString = dateArr.join(' ');

    const parsedDate = parse(dateString, this.showTime ? dateFormatWithTime : dateFormat, new Date());

    if(!isValid(parsedDate)) {
      return null
    }

    if (!this.showTime){
      parsedDate.setHours(0, Math.abs(new Date().getTimezoneOffset()), 0, 0);
    }

    return parsedDate.toISOString();
  }

  private parseDate(dateString: string): Date {
    const dateFromISO = new Date(dateString);
    const formatString = this.showTime ? dateFormatWithTime : dateFormat;

    const parsedDateString = format(dateFromISO, formatString);
    return parse(parsedDateString, formatString, new Date());
  }
}
