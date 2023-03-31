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
import { SearchPaymentStore } from '../../../../store/search-payment.store';
import { prepareSearchPaymentsData } from '../search-payment-table/search-payment-table.utils';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
  providers: [SearchPaymentStore],
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

  constructor(
    private searchPaymentService: SearchPaymentService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private changeDetectionRef: ChangeDetectorRef,
    private searchPaymentStore: SearchPaymentStore,
    private datePipe: DatePipe,
  ) {}

  ngOnDestroy(): void {
    this.searchPaymentStore.effectFilter(this.filters);
    this.searchPaymentStore.effectValidations(this.filtersValidation);
  }

  ngOnInit(): void {
    
    this.searchPaymentStore.store$.subscribe(console.log);
    this.dateNow.setUTCHours(0, 0, 0, 0);
    this.searchPaymentStore.filters$.subscribe(filters => {
      this.filters = filters;
      this.changeDetectionRef.detectChanges();
    });
    this.searchPaymentStore.validations$.subscribe(validations => {
      this.filtersValidation = validations;
      this.changeDetectionRef.detectChanges();
    });
  }

  onClear() {
    this.searchPaymentStore.effectFilter( {
      ...defineDefaultFiltersValues(),
      dateTimeFrom: null,
      dateTimeTo: null,
    });
    this.searchPaymentStore.effectValidations(this.filtersValidation);
  }

  validate(validateOnlyDates?: boolean): boolean {
    if (!validateOnlyDates) {
      const anyFilledValidation = anyFieldFilledValidator(this.filters);

      if (anyFilledValidation) {
        this.searchPaymentStore.effectValidations({ ...anyFilledValidation });
        this.toastService.showErrorToast(
          'Заполните хотя бы одно из полей Идентификатор платежа, Идентификатор заявки, Идентификатор документа, Номер документа',
        );
        return false;
      }
    }

    if (!generalFieldsFilled(this.filters)) {
      const [dateFromValidation, dateToValidation, plannedDateValidation] = [
        required(this.filters.dateTimeFrom) ||
          earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, '«Дата/Время с» превышает «Дата/Время по»'),
        required(this.filters.dateTimeTo) || lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40),
        laterOrEqualThen(this.dateNow.toISOString(), this.filters.plannedDate),
      ];
      this.searchPaymentStore.effectValidations({
          ...this.filtersValidation,
          dateFrom: dateFromValidation,
          dateTo: dateToValidation,
          plannedDate: plannedDateValidation,
        }
      );
    }

    this.searchPaymentStore.effectValidations({
      ...this.filtersValidation,
      paymentID: containInvalidSymbols(this.filters.paymentID ?? ''),
      applicationID: containInvalidSymbols(this.filters.applicationID ?? ''),
      idPH: containInvalidSymbols(this.filters.idPH ?? ''),
      docID: containInvalidSymbols(this.filters.docID ?? ''),
      linkedChequeId: containInvalidSymbols(this.filters.linkedChequeId ?? ''),
      docNum: containInvalidSymbols(this.filters.docNum ?? ''),
      account: containInvalidSymbols(this.filters.account ?? ''),
      chequeNumber: containInvalidSymbols(this.filters.chequeNumber ?? ''),
      channelIP: containInvalidSymbols(this.filters.channelIP ?? ''),
      statusCode: containInvalidSymbols(this.filters.statusCode ?? ''),
      userAgent: containInvalidSymbols(this.filters.userAgent ?? ''),
    });
    return Object.values(this.filtersValidation).every(value => !Boolean(value));
  }

  onSearch() {
    if (!this.validate()) {
      return;
    }

    this.searchPaymentStore.effectFilter(this.filters);
    this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(
      response => {
        this.searchPaymentStore.effectTableData(response ? prepareSearchPaymentsData(response, this.datePipe) : null);
      },
      error => {
        this.toastService.showErrorToast("Внутренняя ошибка сервиса. Возникла ошибка при получении информации о переводах/платежах");
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

  dateTimeFromChanged(){
    this.dateChanged();
  }

  dateTimeToChanged(){
    this.dateChanged();
  }

  plannedDateChanged(){
    this.dateChanged();
  }

  searchAndGenerateDoc() {
    if (!this.validate()) {
      return;
    }
    this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
      XlsxHelper.exportArrayToExcel(response, Object.getOwnPropertyNames(response[0]), 'Выгрузка_в_excel_test');
    });
  }
}
