import { Component, OnInit } from '@angular/core';
import { tableValuesMock } from '../../../../../shared/mocks/number-of-orders-table.mock'
import { MonitoringStandingOrdersService } from '../../../../services/monitoring-standing-orders/monitoring-standing-orders.service'
import { StandingOrderStatResponse } from '../../../../../shared/models/MonitoringStandingOrders'

@Component({
  selector: 'app-number-of-orders-table',
  templateUrl: './number-of-orders-table.component.html',
  styleUrls: ['./number-of-orders-table.component.scss']
})
export class NumberOfOrdersTableComponent implements OnInit {

  constructor(private monitoringStandingOrdersService: MonitoringStandingOrdersService){ }

  standingOrderStatResponse: StandingOrderStatResponse = { } as StandingOrderStatResponse;

  ngOnInit(): void {
    this.monitoringStandingOrdersService.getStandingOrderStat().subscribe(response => {
      this.standingOrderStatResponse = response;
    });
  }
  
}
