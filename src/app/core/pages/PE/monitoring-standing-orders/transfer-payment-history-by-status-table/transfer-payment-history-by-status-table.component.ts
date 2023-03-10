import { Component, Input } from '@angular/core';
import { MonitoringStandingOrdersService } from 'src/app/core/services/monitoring-standing-orders/monitoring-standing-orders.service';
import { MonitoringDataRecord, StandingOrderStatResponse } from 'src/app/shared/models/monitoring-standing-orders';

@Component({
  selector: 'app-transfer-payment-history-by-status-table',
  templateUrl: './transfer-payment-history-by-status-table.component.html',
  styleUrls: ['./transfer-payment-history-by-status-table.component.scss']
})
export class TransferPaymentHistoryByStatusTableComponent {

  constructor(private msoService: MonitoringStandingOrdersService){ }

  @Input() monitoringDataRecord!: MonitoringDataRecord[] | null;

  ngOnInit(): void { }

  onRowSelected(e: any) {
    this.msoService
      .$selectedMonitoringDataRecord
      .next(<MonitoringDataRecord> e.data);
  }

}
