import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { containInvalidSymbols, earlierThen, lessThanDateDiapason, required } from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';
import { ToastService } from '../../../../../shared/services/toast.service';
import {
  anyFieldFilledValidator,
  defineDefaultFiltersValues,
  generalFieldsFilled,
  prepareSearchFilters,
} from './bank-ops-check-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { IBankOpsCheckFilters } from './bank-ops-check-filters.types';
import { BankOpsCheckService } from '../../../../services/bank-ops-check/bank-ops-check.service';

@Component({
  selector: 'app-bank-ops-check-filters',
  templateUrl: './bank-ops-check-filters.component.html',
  styleUrls: ['./bank-ops-check-filters.component.scss'],
})
export class BankOpsCheckFiltersComponent implements OnInit, OnDestroy {
  public filters!: IBankOpsCheckFilters;

  dateNow: Date = new Date();

  public filtersValidation: Validation = {
    dateTimeFrom: null,
    dateTimeTo: null,
  };

  validateDates: boolean = false;

  multiselectDataSetsEnum = MultiselectDataSets;

  constructor(
    private bankOpsCheckService: BankOpsCheckService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.bankOpsCheckService.$filters.next(this.filters);
  }

  ngOnInit(): void {
    this.dateNow.setUTCHours(0, 0, 0, 0);
    if (this.bankOpsCheckService.$filters.value) {
      this.filters = this.bankOpsCheckService.$filters.value;
    } else {
      this.filters = defineDefaultFiltersValues();
      this.bankOpsCheckService.$filters.next(this.filters);
    }
    this.changeDetectionRef.detectChanges();
  }

  onClear() {
    this.filters = {
      ...defineDefaultFiltersValues(),
      dateTimeFrom: null,
      dateTimeTo: null,
    };

    this.filtersValidation = {};
    this.bankOpsCheckService.$tableData.next(null)

    this.changeDetectionRef.detectChanges();
  }

  validate(validateOnlyDates?: boolean): boolean {
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
        this.filters.dateTimeTo &&
          (required(this.filters.dateTimeFrom) ||
            earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, '«Дата/Время с» превышает «Дата/Время по»') ||
            lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40, ' ')),
        this.filters.dateTimeFrom &&
          (required(this.filters.dateTimeTo) ||
            lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40) ||
            earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, ' ')),
      ];

      this.filtersValidation = {
        ...this.filtersValidation,
        dateTimeFrom: dateFromValidation,
        dateTimeTo: dateToValidation,
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
      applicationStatus: '',
    };

    return Object.values(this.filtersValidation).every(value => !Boolean(value));
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.bankOpsCheckService.filter(prepareSearchFilters(this.filters));
    this.bankOpsCheckService.$filters.next(this.filters);
  }
}
