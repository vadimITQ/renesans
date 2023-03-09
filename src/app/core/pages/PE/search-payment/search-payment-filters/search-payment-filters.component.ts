import { Component } from '@angular/core';
import { objectTypeOptions, receivingChanelOptions } from './search-payment-filters.constants';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormBuilder } from '@angular/forms';
import { earlierThen, laterThen, lessThanDateDiapason } from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';
import { ISearchPaymentFilters } from './search-payment-filters.types';
import { ToastService } from '../../../../../shared/services/toast.service';
import { anyFieldFilledValidator, defineDefaultFiltersValues } from './search-payment-filters.utils';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent {
  public filters: ISearchPaymentFilters = defineDefaultFiltersValues();

  public filtersValidation: Validation = {
    dateFrom: null,
    dateTo: null,
  };

  receivingChanelOptions = receivingChanelOptions;
  objectTypeOptions = objectTypeOptions;
  transferTypes = manualChecksTransferTypes;

  constructor(private searchPaymentService: SearchPaymentService, private fb: FormBuilder, private toastService: ToastService) {
    
  }

  // form: FormGroup = this.fb.group({
  //   dateFrom: new FormControl(this.filters.dateFrom, earlierThen('dateTo')),
  //   dateTo: new FormControl(this.filters.dateTo, laterThen('dateFrom')),
  // });

  openDateFromCalendar() {
    
  }

  openDateToCalendar() {}

  openPlanDateCalendar() {}

  clearFilter() {
    this.filters = { } as ISearchPaymentFilters;
  }

  onSearch() {
    const anyFilledValidation = anyFieldFilledValidator(this.filters);

    if (anyFilledValidation) {
      this.filtersValidation = { ...anyFilledValidation };
      this.toastService.showErrorToast(
        'Заполните хотя бы одно из полей Идентификатор платежа, Идентификатор заявки, Идентификатор документа, Номер документа',
      );
      return;
    }

    const [dateFromValidation, dateToValidation] = [
      earlierThen(this.filters.dateFrom, this.filters.dateTo) || lessThanDateDiapason(this.filters.dateFrom, this.filters.dateTo, 40),
      laterThen(this.filters.dateFrom, this.filters.dateTo) || lessThanDateDiapason(this.filters.dateFrom, this.filters.dateTo, 40),
    ];

    this.filtersValidation = {
      dateFrom: dateFromValidation,
      dateTo: dateToValidation,
    };
    //
    // this.searchPaymentService.getPayments();
  }
}
