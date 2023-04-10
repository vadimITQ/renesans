import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { objectTypeOptions, receivingChanelOptions } from './search-payment-filters.constants';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormBuilder } from '@angular/forms';
import {
  containInvalidSymbols,
  earlierThen,
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
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { paymentStatuses } from 'src/app/shared/variables/payment-status';

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

  receivingChanelOptions = receivingChanelOptions;
  objectTypeOptions = objectTypeOptions;
  transferTypes = manualChecksTransferTypes;
  paymentStatuses = paymentStatuses;
  ipRegExp = /^([\d.]+)$/i;

  constructor(
    private searchPaymentService: SearchPaymentService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef,
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
    if (!validateOnlyDates) {
      const anyFilledValidation = anyFieldFilledValidator(this.filters);

      if (anyFilledValidation) {
        this.filtersValidation = { ...anyFilledValidation };
        this.toastService.showErrorToast(
          'Заполните хотя бы одно из полей Идентификатор платежа, Идентификатор заявки, Идентификатор документа, Номер документа',
        );
        return false;
      }
    }

    if (!generalFieldsFilled(this.filters)) {
      const [dateFromValidation, dateToValidation] = [
        required(this.filters.dateTimeFrom) ||
          earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, '«Дата/Время с» превышает «Дата/Время по»'),
        required(this.filters.dateTimeTo) || lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40),
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
      linkedChequeId: containInvalidSymbols(this.filters.linkedChequeId ?? ''),
      docNum: containInvalidSymbols(this.filters.docNum ?? ''),
      account: containInvalidSymbols(this.filters.account ?? ''),
      chequeNumber: containInvalidSymbols(this.filters.chequeNumber ?? ''),
      statusCode: containInvalidSymbols(this.filters.statusCode ?? ''),
      userAgent: containInvalidSymbols(this.filters.userAgent ?? ''),
      plannedDate: laterOrEqualThen(this.dateNow.toISOString(), this.filters.plannedDate),
    };

    return Object.values(this.filtersValidation).every(value => !Boolean(value));
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(
      response => {},
      error => {
        this.toastService.showErrorToast('Внутренняя ошибка сервиса. Возникла ошибка при получении информации о переводах/платежах');
      },
    );
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
    this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
      XlsxHelper.exportArrayToExcel(response.payments, Object.getOwnPropertyNames(response.payments[0]), 'Выгрузка_в_excel_test');
    });
  }
}
