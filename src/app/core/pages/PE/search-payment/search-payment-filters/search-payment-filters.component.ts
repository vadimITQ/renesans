import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormBuilder } from '@angular/forms';
import {
  containInvalidSymbols,
  earlierThen, invalidIpAddress,
  laterOrEqualThen,
  lessThanDateDiapason,
  required,
} from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';
import { ISearchPaymentFilters } from './search-payment-filters.types';
import { ToastService } from '../../../../../shared/services/toast.service';
import {
  anyFieldFilledValidator,
  defineDefaultFiltersValues,
  generalFieldsFilled,
  prepareSearchFilters,
} from './search-payment-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent implements OnInit, OnDestroy {
  public filters!: ISearchPaymentFilters;

  dateNow: Date = new Date();

  public filtersValidation: Validation = {
    dateTimeFrom: null,
    dateTimeTo: null,
  };

  validateDates: boolean = false;

  multiselectDataSetsEnum = MultiselectDataSets;
  ipRegExp = /^([\d.]+)$/i;

  constructor(
    private searchPaymentService: SearchPaymentService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.searchPaymentService.$filters.next(this.filters);
  }

  ngOnInit(): void {
    this.dateNow.setUTCHours(0, 0, 0, 0);
    if (this.searchPaymentService.$filters.value) {
      this.filters = this.searchPaymentService.$filters.value;
    } else {
      this.filters = defineDefaultFiltersValues();
      this.searchPaymentService.$filters.next(this.filters);
    }
    this.changeDetectionRef.detectChanges();
  }

  // form: FormGroup = this.fb.group({
  //   dateFrom: new FormControl(this.filters.dateFrom, earlierThen('dateTo')),
  //   dateTo: new FormControl(this.filters.dateTo, laterThen('dateFrom')),
  // });

  onClear() {
    this.filters = {
      ...defineDefaultFiltersValues(),
      dateTimeFrom: null,
      dateTimeTo: null,
    };

    this.filtersValidation = {};
  }

  validate(validateOnlyDates?: boolean): boolean {
    // if (this.formWasCleared) {
    //   return true;
    // }

    if (!validateOnlyDates) {
      const anyFilledValidation = anyFieldFilledValidator(this.filters);

      if (anyFilledValidation) {
        this.filtersValidation = { ...anyFilledValidation };
        this.toastService.showErrorToast('Заполните хотя бы одно из полей фильтров или укажите интервал дат');
        return false;
      }
    }

    if (!generalFieldsFilled(this.filters)) {
      const [dateFromValidation, dateToValidation] = [
        this.filters.dateTimeTo && (required(this.filters.dateTimeFrom) ||
          earlierThen(this.filters.dateTimeFrom?.toISOString() ?? null, this.filters.dateTimeTo.toISOString(), '«Дата/Время с» превышает «Дата/Время по»')),
        this.filters.dateTimeFrom && (required(this.filters.dateTimeTo) ||
          lessThanDateDiapason(this.filters.dateTimeFrom.toISOString(), this.filters.dateTimeTo?.toISOString() ?? null, 40)),
      ];

      this.filtersValidation = {
        ...this.filtersValidation,
        dateFrom: dateFromValidation,
        dateTo: dateToValidation,
      };
    } else {
      this.filtersValidation = {
        ...this.filtersValidation,
        dateFrom: null,
        dateTo: null,
      };
    }

    this.filtersValidation = {
      ...this.filtersValidation,
      paymentID: containInvalidSymbols(this.filters.paymentID ?? ''),
      applicationID: containInvalidSymbols(this.filters.applicationID ?? ''),
      idPH: containInvalidSymbols(this.filters.idPH ?? ''),
      docID: containInvalidSymbols(this.filters.docID ?? ''),
      chequeId: containInvalidSymbols(this.filters.chequeId ?? ''),
      docNum: containInvalidSymbols(this.filters.docNum ?? ''),
      account: containInvalidSymbols(this.filters.account ?? ''),
      chequeNumber: containInvalidSymbols(this.filters.chequeNumber ?? ''),
      statusCode: containInvalidSymbols(this.filters.statusCode ?? ''),
      userAgent: containInvalidSymbols(this.filters.userAgent ?? ''),
      plannedDate: laterOrEqualThen(this.dateNow.toISOString(), this.filters.plannedDate?.toISOString() ?? null),
      channelIP: this.filters.channelIP ? invalidIpAddress(this.filters.channelIP) : null,
      channelName: "",
      codeStatuses: "",
      parentType: "",
      type: ""
    };

    return Object.values(this.filtersValidation).every(value => !Boolean(value));
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.searchPaymentService.filter(prepareSearchFilters(this.filters));
    this.searchPaymentService.$filters.next(this.filters);
  }

  dateChanged() {
    if (!this.validateDates) {
      this.validateDates = true;
      return;
    }
    this.validate(true);
  }

  searchAndGenerateDoc() {
    if (!this.validate()) {
      return;
    }
    // todo: implement me after API update
    // this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
    //   XlsxHelper.exportArrayToExcel(response.payments, Object.getOwnPropertyNames(response.payments[0]), 'Выгрузка_в_excel_test');
    // });
  }
}
