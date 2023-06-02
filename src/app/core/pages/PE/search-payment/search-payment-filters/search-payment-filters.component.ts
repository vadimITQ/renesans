import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormGroup } from '@angular/forms';
import { ISearchPaymentFilterForm } from './search-payment-filters.types';
import { SearchPaymentsFilterUtils } from './search-payment-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { SearchPaymentFilterValidation } from './search-payment-filter.validation';
import { ipRegExp } from 'src/app/shared/variables/pe-input-validations';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent implements OnInit, OnDestroy {
  
  constructor(
    private searchPaymentService: SearchPaymentService,
    private changeDetectionRef: ChangeDetectorRef,
    private searchPaymentsUtils: SearchPaymentsFilterUtils,
    public validation: SearchPaymentFilterValidation
  ) {}

  public filter: FormGroup<ISearchPaymentFilterForm> = this.searchPaymentsUtils.createDefaultFilterFormGroup();
  multiselectDataSetsEnum = MultiselectDataSets;
  readonly IP_REG_EXPR = ipRegExp;

  ngOnDestroy(): void {
    this.searchPaymentService.$filter.next(this.filter);
  }

  ngOnInit(): void {
    if (this.searchPaymentService.$filter.value) {
      this.filter = this.searchPaymentService.$filter.value;
    }
    this.changeDetectionRef.detectChanges();
  }

  onClear() {
    PEReactiveHelper.resetForm(this.filter);
  }

  onSearch() {
    this.validation.validateFilter(this.filter, true);
    if (this.filter.valid) {
      console.log("FILTER VALID");
      this.searchPaymentService.filter(this.searchPaymentsUtils.prepareSearchFilters(this.filter));
    }
    else {
      this.searchPaymentsUtils.showErrorMessages(this.filter);
    }
  }

  searchAndGenerateDoc() {
    // todo: implement me after API update
    // this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
    //   XlsxHelper.exportArrayToExcel(response.payments, Object.getOwnPropertyNames(response.payments[0]), 'Выгрузка_в_excel_test');
    // });
  }

  // validate(validateOnlyDates?: boolean): boolean {
  //   // if (this.formWasCleared) {
  //   //   return true;
  //   // }

  //   if (!validateOnlyDates) {
  //     const anyFilledValidation = anyFieldFilledValidator(this.filters);

  //     if (anyFilledValidation) {
  //       this.filtersValidation = { ...anyFilledValidation };
  //       this.toastService.showErrorToast('Заполните хотя бы одно из полей фильтров или укажите интервал дат');
  //       return false;
  //     }
  //   }

  //   if (!generalFieldsFilled(this.filters)) {
  //     const [dateFromValidation, dateToValidation] = [
  //       this.filters.dateTimeTo && (required(this.filters.dateTimeFrom) ||
  //         earlierThen(this.filters.dateTimeFrom, this.filters.dateTimeTo, '«Дата/Время с» превышает «Дата/Время по»')),
  //       this.filters.dateTimeFrom && (required(this.filters.dateTimeTo) ||
  //         lessThanDateDiapason(this.filters.dateTimeFrom, this.filters.dateTimeTo, 40)),
  //     ];

  //     this.filtersValidation = {
  //       ...this.filtersValidation,
  //       dateFrom: dateFromValidation,
  //       dateTo: dateToValidation,
  //     };
  //   } else {
  //     this.filtersValidation = {
  //       ...this.filtersValidation,
  //       dateFrom: null,
  //       dateTo: null,
  //     };
  //   }

  //   this.filtersValidation = {
  //     ...this.filtersValidation,
  //     paymentID: containInvalidSymbols(this.filters.paymentID ?? ''),
  //     applicationID: containInvalidSymbols(this.filters.applicationID ?? ''),
  //     idPH: containInvalidSymbols(this.filters.idPH ?? ''),
  //     docID: containInvalidSymbols(this.filters.docID ?? ''),
  //     linkedChequeId: containInvalidSymbols(this.filters.linkedChequeId ?? ''),
  //     docNum: containInvalidSymbols(this.filters.docNum ?? ''),
  //     account: containInvalidSymbols(this.filters.account ?? ''),
  //     chequeNumber: containInvalidSymbols(this.filters.chequeNumber ?? ''),
  //     statusCode: containInvalidSymbols(this.filters.statusCode ?? ''),
  //     userAgent: containInvalidSymbols(this.filters.userAgent ?? ''),
  //     plannedDate: laterOrEqualThen(this.dateNow.toISOString(), this.filters.plannedDate),
  //     channelName: "",
  //     codeStatuses: "",
  //     parentType: "",
  //     type: ""
  //   };

  //   return Object.values(this.filtersValidation).every(value => !Boolean(value));
  // }

  // onSearch() {
  //   if (!this.validate()) {
  //     return;
  //   }

  //   this.searchPaymentService.filter(prepareSearchFilters(this.filters));
  //   this.searchPaymentService.$filters.next(this.filters);
  // }

  // dateChanged() {
  //   if (!this.validateDates) {
  //     this.validateDates = true;
  //     return;
  //   }
  //   this.validate(true);
  // }

  // searchAndGenerateDoc() {
  //   if (!this.validate()) {
  //     return;
  //   }
  //   // todo: implement me after API update
  //   // this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
  //   //   XlsxHelper.exportArrayToExcel(response.payments, Object.getOwnPropertyNames(response.payments[0]), 'Выгрузка_в_excel_test');
  //   // });
  // }
}
