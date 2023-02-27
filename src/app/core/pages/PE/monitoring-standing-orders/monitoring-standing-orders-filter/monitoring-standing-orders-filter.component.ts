import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-monitoring-standing-orders-filter',
  templateUrl: './monitoring-standing-orders-filter.component.html',
  styleUrls: ['./monitoring-standing-orders-filter.component.scss']
})
export class MonitoringStandingOrdersFilterComponent implements OnInit {

  constructor(){}

  @ViewChild("calendar", { static: false }) calendar!: Calendar;
  @Output() OnRefreshData = new EventEmitter<Date>();

  executionDate: Date = new Date();

  ngOnInit(): void {
    this.refreshData();
  }

  openCalendar() {
    this.calendar?.inputfieldViewChild?.nativeElement?.click();
  }

  refreshData() {
    this.OnRefreshData.emit(this.executionDate);
  }

}
