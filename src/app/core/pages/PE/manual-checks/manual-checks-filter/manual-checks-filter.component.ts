import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { sub } from 'date-fns';
import { Calendar } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { GetPaymentsResponse, ManualChecksFilter } from 'src/app/shared/models/manual-checks-models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Validation } from 'src/app/shared/validation/types';
import { paymentStatuses } from 'src/app/shared/variables/payment-status';
import { manualChecksStatuses, manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { ManualChecksService } from '../../../../services/manual-checks/manual-checks.service';
import { receivingChanelOptions } from '../../search-payment/search-payment-filters/search-payment-filters.constants';
import { ISearchPaymentFilters } from '../../search-payment/search-payment-filters/search-payment-filters.types';
import { defineDefaultFiltersValues } from '../../search-payment/search-payment-filters/search-payment-filters.utils';
import { validateDates, validateFilter, validateFilterOnEmpty } from './manual-checks-filter.validation';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss'],
})
export class ManualChecksFilterComponent implements OnInit, OnDestroy {
  
  constructor(
    private mcService: ManualChecksService, 
    private changeDetectionRef: ChangeDetectorRef, 
    private toastService: ToastService
  ) {}

  @ViewChild('dateFromRef') dateFromRef!: Calendar;
  @ViewChild('dateToRef') dateToRef!: Calendar;

  public validations: Validation = {
    dateFrom: null,
    dateTo: null,
  };

  public transferTypes = manualChecksTransferTypes;
  public paymentStatuses = paymentStatuses;
  public receivingChanelOptions = receivingChanelOptions;
  public $paymentsResponse!: Observable<GetPaymentsResponse[]>;
  public filter!: ISearchPaymentFilters;
  public validateDates: boolean = false;

  ngOnDestroy(): void {
    this.mcService.componentState.$filters.next(this.filter);
  }

  ngOnInit(): void {
    if (this.mcService.componentState.$filters.value){
      this.filter = this.mcService.componentState.$filters.value;
    }
    else {
      this.filter = defineDefaultFiltersValues();
    }
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
      ...defineDefaultFiltersValues(),
      dateTimeFrom: null,
      dateTimeTo: null,
    };

    this.validations = {};
    this.mcService.$paymentResponseState.next(undefined);
    this.changeDetectionRef.detectChanges();
  }

  searchPayments() {
    const filterValidation = validateFilter(this.filter);
    if (filterValidation.success){
      this.validations = {};
      this.mcService.getPayments(this.filter).subscribe();
    }
    else {
      const validateEmpty = validateFilterOnEmpty(this.filter);
      if (validateEmpty) {
        this.validations = { ...this.validations, ...validateEmpty };
        this.toastService.showErrorToast('Заполните хотя бы одно из полей ID PE, ID PH, ID заявки, Номер счета');
      }
      else {
        this.toastService.showErrorToast(filterValidation.validationMessage!); 
      }
    }
  }

  onDateChange(dateFrom: string | null, dateTo: string | null) {
    if (!this.validateDates){
      this.validateDates = true;
      return;
    }
    const { dateFromValidation, dateToValidation } = validateDates(dateFrom, dateTo);
    this.validations['dateFrom'] = dateFromValidation;
    this.validations['dateTo'] = dateToValidation;
  }
}
