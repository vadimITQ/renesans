import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MonitoringStandingOrdersService } from 'src/app/core/services/monitoring-standing-orders/monitoring-standing-orders.service';
import { MonitoringDataRecord, StandingOrderStatResponse } from 'src/app/shared/models/monitoring-standing-orders';
import { OrdersStat } from 'src/app/shared/enums/orders-Stat.enums';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { DialogService } from '../../../../shared/services/dialog.service';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';

@Component({
  selector: 'app-monitoring-standing-orders',
  templateUrl: './monitoring-standing-orders.component.html',
  styleUrls: ['./monitoring-standing-orders.component.scss']
})
export class MonitoringStandingOrdersComponent implements OnInit {

  constructor(
    private msoService: MonitoringStandingOrdersService,
    private datePipe: DatePipe,
    private dialogService: DialogService,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService
  ) {}

  public $standingOrderStat: Observable<StandingOrderStatResponse> | null = null;
  public standingOrderStat: StandingOrderStatResponse | null = null;
  public monitoringDataRecord: MonitoringDataRecord[] | null = null;
  private ordersStat: OrdersStat = OrdersStat.ProcessedOrder;

  ngOnInit(): void { 
    this.msoService
      .$selectedMonitoringDataRecord
      .subscribe((selectedMonitoringDataRecord: MonitoringDataRecord) => {
        if (!!selectedMonitoringDataRecord){
          
        }
      });
  }

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToMonitoringStandingOrders();
  }

  onRefreshingData(executionDate: Date) {
    this.$standingOrderStat = null;
    this.standingOrderStat = null;
    this.monitoringDataRecord = null;
    if (executionDate){
      this.$standingOrderStat = this.msoService.getStandingOrderStat();
      this.$standingOrderStat.subscribe(response => {
        this.standingOrderStat = response;
        this.filterMonitoringDataRecord();
      });
    }
  }

  filterMonitoringDataRecord() {
    this.monitoringDataRecord = [];
    let filter: () => MonitoringDataRecord[];
    switch(this.ordersStat){
      case(OrdersStat.ProcessedOrder): {
        filter = () => this.standingOrderStat?.monitoringDataRecord ?? [];
        break;
      }
      case(OrdersStat.SuccessfullyProcessed): {
        filter = () => this.standingOrderStat?.monitoringDataRecord ?? [];
        break;
      }
      case(OrdersStat.FailedProcessed): {
        filter = () => this.standingOrderStat?.monitoringDataRecord ?? [];
        break;
      }
      case(OrdersStat.Processing): {
        filter = () => this.standingOrderStat?.monitoringDataRecord ?? [];
        break;
      }
    }
    this.monitoringDataRecord = this.standingOrderStat?.monitoringDataRecord.filter(filter) ?? [];  
  }

  back() {
    this.peNavigationService.goBack();
  }

  onFilteringByOrdersStat(ordersStat: any) {
    if (ordersStat >= 0){
      this.monitoringDataRecord = null;
      this.ordersStat = ordersStat as OrdersStat;
      setTimeout(() => {
        this.filterMonitoringDataRecord();  
      }, 1000);
    }
  }

  generateAReport() {
    // XlsxHelper
    //   .exportArrayToExcel(
    //     (
    //       this.monitoringDataRecord as MonitoringDataRecord[]
    //     )?.map(
    //       record => {  
    //         return {
    //           ...record,
    //           startDate: this.datePipe.transform(record.startDate, "dd.MM.yyyy"),
    //           planEndDate: this.datePipe.transform(record.planEndDate, "dd.MM.yyyy")
    //         }
    //       }
    //     ) ?? [], 
    //     [
    //       "",
    //       "ID длительного поручения»",
    //       "Начало действия»",
    //       "Тип перевода\платежа»",
    //       "Сумма»",
    //       "Счет источник»",
    //       "Счет приемник»",
    //       "Срок действия»",
    //       "Периодичность»",
    //       "Ссылка на платеж\перевод»",
    //       "Статус операции по распоряжению»",
    //       "Описание ошибки",
    //       "Ссылка на заявку"
    //     ],
    //     "История_перевода_платежа_постатусно"
    //   );
  }

  cancelStandingOrder() {
    this.dialogService.showConfirmDialog(
      {
        message: "Вы действительно хотите отменить распоряжение ?",
        header: "Подтверждение",
        accept: {
          label: "Да",
          handler: () => { console.log("accepted") }
        },
        reject: {
          label: "Нет",
          handler: () => { console.log("rejected") }
        }
      }
    );
  }

  processStandingOrderRequest() {
    this.dialogService.showConfirmDialog(
      {
        message: "Вы действительно хотите повторить обработку по распоряжению ?",
        header: "Подтверждение",
        accept: {
          label: "Да",
          handler: () => { console.log("accepted") }
        },
        reject: {
          label: "Нет",
          handler: () => { console.log("rejected") }
        }
      }
    );
  }

  cancelOperation() {
    this.dialogService.showConfirmDialog(
      {
        message: "Вы действительно хотите отклонить операцию по распоряжению ?",
        header: "Подтверждение",
        accept: {
          label: "Да",
          handler: () => { console.log("accepted") }
        },
        reject: {
          label: "Нет",
          handler: () => { console.log("rejected") }
        }
      }
    );
  }

}
