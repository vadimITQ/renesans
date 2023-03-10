import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { objectTypeOptions, receivingChanelOptions } from './search-payment-filters.constants';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormBuilder } from '@angular/forms';
import { earlierThen, laterThen, lessThanDateDiapason, required } from '../../../../../shared/validation/validators';
import { Validation } from '../../../../../shared/validation/types';
import { ISearchPaymentFilters } from './search-payment-filters.types';
import { ToastService } from '../../../../../shared/services/toast.service';
import { anyFieldFilledValidator, defineDefaultFiltersValues, prepareSearchFilters } from './search-payment-filters.utils';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent implements OnInit {
  public filters!: ISearchPaymentFilters;

  public filtersValidation: Validation = {
    dateTimeFrom: null,
    dateTimeTo: null,
  };

  receivingChanelOptions = receivingChanelOptions;
  objectTypeOptions = objectTypeOptions;
  transferTypes = manualChecksTransferTypes;

  constructor(
    private searchPaymentService: SearchPaymentService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.filters = defineDefaultFiltersValues();
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

  validate(): boolean {
    const anyFilledValidation = anyFieldFilledValidator(this.filters);

    if (anyFilledValidation) {
      this.filtersValidation = { ...anyFilledValidation };
      this.toastService.showErrorToast(
        '?????????????????? ???????? ???? ???????? ???? ?????????? ?????????????????????????? ??????????????, ?????????????????????????? ????????????, ?????????????????????????? ??????????????????, ?????????? ??????????????????',
      );
      return false;
    }

    const [dateFromValidation, dateToValidation] = [
      required(this.filters.dateTimeFrom) ||
        earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo) ||
        lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40),
      required(this.filters.dateTimeTo) ||
        laterThen(this.filters.dateTimeFrom, this.filters.dateTimeTo) ||
        lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40),
    ];

    this.filtersValidation = {
      dateFrom: dateFromValidation,
      dateTo: dateToValidation,
    };

    return Object.values(this.filtersValidation).some(Boolean);
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.searchPaymentService.getPayments(prepareSearchFilters(this.filters)).subscribe();
  }

  searchAndGenerateDoc() {
    if (!this.validate()) {
      return;
    }
    this.searchPaymentService.getPayments(prepareSearchFilters(this.filters)).subscribe(response => {
      XlsxHelper.exportArrayToExcel(response, Object.getOwnPropertyNames(response[0]), '????????????????_??_excel_test');
    });
  }
}
