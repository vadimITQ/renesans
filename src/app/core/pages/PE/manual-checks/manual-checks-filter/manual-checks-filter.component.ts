import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { GetPaymentsResponse, ManualChecksFilter } from 'src/app/shared/models/manual-checks-models';
import { manualChecksStatuses, manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { ManualChecksService } from '../../../../services/manual-checks/manual-checks.service';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss']
})
export class ManualChecksFilterComponent implements OnInit {

  constructor(private mcService: ManualChecksService) { }

  @ViewChild("dateFromRef") dateFromRef!: Calendar;
  @ViewChild("dateToRef") dateToRef!: Calendar;

  public dateFrom: Date = new Date();
  public dateTo: Date = new Date();
  public transferTypes = manualChecksTransferTypes;
  public paymentStatuses = manualChecksStatuses;
  public $paymentsResponse!: Observable<GetPaymentsResponse[]>;
  public filter: ManualChecksFilter = {
    dateFrom: new Date(),
    dateTo: new Date(),
    timeFrom: new Date(),
    timeTo: new Date()
  };

  ngOnInit(): void {
    console.log(this.transferTypes);  
  }

  openDateFromCalendar() {
    this.dateFromRef?.inputfieldViewChild?.nativeElement?.click();
  }
  
  openDateToCalendar() {
    this.dateToRef?.inputfieldViewChild?.nativeElement?.click();
  }

  clearFilter() {
    this.filter = { };
  }

  searchPayments() {
    console.log(this.filter);
    this.mcService
      .getPayments(this.filter)
      .subscribe();
  }

}