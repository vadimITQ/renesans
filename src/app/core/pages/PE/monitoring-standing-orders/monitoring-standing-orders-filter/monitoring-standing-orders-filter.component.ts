import { Component, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-monitoring-standing-orders-filter',
  templateUrl: './monitoring-standing-orders-filter.component.html',
  styleUrls: ['./monitoring-standing-orders-filter.component.scss']
})
export class MonitoringStandingOrdersFilterComponent {

  @ViewChild("calendar", { static: false }) calendar!: Calendar;
  date: string | undefined = undefined;

  openCalendar() {
    this.calendar?.inputfieldViewChild?.nativeElement?.click();
  }

}
