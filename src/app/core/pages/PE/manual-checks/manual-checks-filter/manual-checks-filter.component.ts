import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { sub } from 'date-fns';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { GetPaymentsResponse, ManualChecksFilter } from 'src/app/shared/models/manual-checks-models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Validation } from 'src/app/shared/validation/types';
import { manualChecksStatuses, manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { ManualChecksService } from '../../../../services/manual-checks/manual-checks.service';
import { validateDates, validateFilterOnEmpty } from './manual-checks-filter.validation';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss']
})
export class ManualChecksFilterComponent implements OnInit {

  constructor(
    private mcService: ManualChecksService,
    private changeDetectionRef: ChangeDetectorRef,
    private toastService: ToastService
  ) { }

  @ViewChild("dateFromRef") dateFromRef!: Calendar;
  @ViewChild("dateToRef") dateToRef!: Calendar;

  public validations: Validation = {
    dateFrom: null,
    dateTo: null,
  };

  public transferTypes = manualChecksTransferTypes;
  public paymentStatuses = manualChecksStatuses;
  public $paymentsResponse!: Observable<GetPaymentsResponse[]>;
  public filter: ManualChecksFilter = {
    dateFrom: null,
    dateTo: null
  };  

  ngOnInit(): void {
    console.log(DatePickerHelper.convertToDatePicker(new Date()));
    this.filter = {
      dateFrom: DatePickerHelper.convertToDatePicker(sub(new Date(), { days: 3 })),
      dateTo: DatePickerHelper.convertToDatePicker(new Date())
    };
    this.changeDetectionRef.detectChanges();
  }

  openDateFromCalendar() {
    this.dateFromRef?.inputfieldViewChild?.nativeElement?.click();
  }
  
  openDateToCalendar() {
    this.dateToRef?.inputfieldViewChild?.nativeElement?.click();
  }

  clearFilter() {
    this.filter = { 
      dateFrom:  "",
      dateTo: ""
    };
    this.changeDetectionRef.detectChanges();
  }

  searchPayments() {
    const validateEmpty = validateFilterOnEmpty(this.filter);
    if (validateEmpty){
      this.validations = {...this.validations, ...validateEmpty}
      this.toastService.showErrorToast("Заполните хотя бы одно из полей ID PE, ID PH, ID заявки, Номер счета");
    }
    else {
      this.mcService
        .getPayments(this.filter)
        .subscribe();
    }
  }

  onDateChange(dateFrom: string | null, dateTo: string | null) {
    console.log(dateFrom, dateTo);
    const { dateFromValidation, dateToValidation } = validateDates(dateFrom, dateTo);
    this.validations["dateFrom"] = dateFromValidation;
    this.validations["dateTo"] = dateToValidation;
  }

}
