import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tableValuesMock } from '../../../shared/mocks/number-of-orders-table.mock';
import { of } from 'rxjs/internal/observable/of';
import { delay, Observable, Subject } from 'rxjs';
import { MonitoringDataRecord, StandingOrderStatResponse } from '../../pages/PE/monitoring-standing-orders/monitoring-standing-orders.types';

@Injectable({
  providedIn: 'root',
})
export class MonitoringStandingOrdersService {
  public $selectedMonitoringDataRecord: Subject<Readonly<MonitoringDataRecord>> = new Subject();

  constructor(private http: HttpClient) {}

  public getStandingOrderStat(): Observable<StandingOrderStatResponse> {
    return of(tableValuesMock).pipe(delay(1000));
  }
}
