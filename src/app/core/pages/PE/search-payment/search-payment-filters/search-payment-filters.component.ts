import { Component } from '@angular/core';
import { objectTypeOptions, receivingChanelOptions } from './search-payment-filters.constants';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormBuilder } from '@angular/forms';
import { earlierThen, laterThen } from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';

interface IFilters {
  paymentId: string;
  applicationID: string;
  idPH: string;
  docID: string;
  linkedChequeId: string;
  docNum: string;
  account: string;
  channelIP: string;
  userAgent: string;
  chequeNumber: string;
  statusCode: string;
  appCreationTime?: string;
  /// must be one field?
  dateFrom: string | null;
  dateTo: string | null;
  ///
  plannedDate: string | null;
  channelName: string[];
  parentType: string[];
  type: string;
}

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent {
  public filters: IFilters = {
    paymentId: 'asda',
    applicationID: '',
    idPH: '',
    docID: '',
    linkedChequeId: '',
    docNum: '',
    account: '',
    channelIP: '',
    userAgent: 'asdas',
    chequeNumber: '',
    statusCode: '',
    dateFrom: null,
    dateTo: null,
    plannedDate: null,
    channelName: [],
    parentType: [],
    type: '',
  };

  public filtersValidation: Validation = {
    dateFrom: null,
    dateTo: null,
  };

  receivingChanelOptions = receivingChanelOptions;
  objectTypeOptions = objectTypeOptions;
  transferTypes = manualChecksTransferTypes;

  constructor(private searchPaymentService: SearchPaymentService, private fb: FormBuilder) {}

  // form: FormGroup = this.fb.group({
  //   dateFrom: new FormControl(this.filters.dateFrom, earlierThen('dateTo')),
  //   dateTo: new FormControl(this.filters.dateTo, laterThen('dateFrom')),
  // });

  openDateFromCalendar() {
    // console.log(this.filters.dateFrom);
  }

  openDateToCalendar() {}

  openPlanDateCalendar() {}

  onSearch() {
    const [dateFromValidation, dateToValidation] = [
      earlierThen(this.filters.dateFrom, this.filters.dateTo),
      laterThen(this.filters.dateFrom, this.filters.dateTo),
    ];

    this.filtersValidation = {
      dateFrom: dateFromValidation,
      dateTo: dateToValidation,
    };

    console.log(this.filtersValidation);
    // this.searchPaymentService.getPayments();
  }
}
