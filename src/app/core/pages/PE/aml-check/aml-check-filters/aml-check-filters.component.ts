import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  containInvalidSymbols,
  earlierThen,
  lessThanDateDiapason,
  required,
} from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';
import { ToastService } from '../../../../../shared/services/toast.service';
import {
  anyFieldFilledValidator,
  defineDefaultFiltersValues,
  generalFieldsFilled,
  prepareSearchFilters,
} from './aml-check-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import {IAmlCheckFilters} from "./aml-check-filters.types";
import {AmlCheckService} from "../../../../services/aml-check/aml-check.service";
import {PeRolesService} from "../../../../services/auth/pe-roles.service";

@Component({
  selector: 'app-aml-check-filters',
  templateUrl: './aml-check-filters.component.html',
  styleUrls: ['./aml-check-filters.component.scss'],
})
export class AmlCheckFiltersComponent implements OnInit, OnDestroy {
  public filters!: IAmlCheckFilters;

  dateNow: Date = new Date();

  public filtersValidation: Validation = {
    dateTimeFrom: null,
    dateTimeTo: null,
  };

  validateDates: boolean = false;

  multiselectDataSetsEnum = MultiselectDataSets;

  constructor(
    private amlCheckService: AmlCheckService,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef,
    private peRolesService: PeRolesService,
  ) {}

  ngOnDestroy(): void {
    this.amlCheckService.$filters.next(this.filters);
  }

  ngOnInit(): void {
    this.dateNow.setUTCHours(0, 0, 0, 0);
    if (this.amlCheckService.$filters.value) {
      this.filters = this.amlCheckService.$filters.value;
    } else {
      this.filters = defineDefaultFiltersValues();
      this.amlCheckService.$filters.next(this.filters);
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
        this.filters.dateTimeTo && (required(this.filters.dateTimeFrom) ||
          earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, '«Дата/Время с» превышает «Дата/Время по»') ||
          lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40, ' ')),
        this.filters.dateTimeFrom && (required(this.filters.dateTimeTo) ||
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
      applicationStatus: ""
    };

    return Object.values(this.filtersValidation).every(value => !Boolean(value));
  }


  get hasAccessToSearchOnlyExpired() {
    return this.peRolesService.hasAccessToSearchOnlyExpired();
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.amlCheckService.filter(prepareSearchFilters(this.filters));
    this.amlCheckService.$filters.next(this.filters);
  }

}
