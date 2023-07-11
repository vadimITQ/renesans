import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SearchPaymentService } from '../../../../services/search-payment/search-payment.service';
import { FormGroup } from '@angular/forms';
import { ISearchPaymentFilterForm } from './search-payment-filters.types';
import { SearchPaymentsFilterUtils } from './search-payment-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { SearchPaymentFilterValidation } from './search-payment-filter.validation';
import { ipRegExp } from 'src/app/shared/variables/pe-input-validations';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { XlsxHelper } from 'src/app/shared/classes/xlsx-Helper';
import { DatePipe } from '@angular/common';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-search-payment-filters',
  templateUrl: './search-payment-filters.component.html',
  styleUrls: ['./search-payment-filters.component.scss'],
})
export class SearchPaymentFiltersComponent implements OnInit, OnDestroy {
  
  constructor(
    public searchPaymentService: SearchPaymentService,
    private changeDetectionRef: ChangeDetectorRef,
    private searchPaymentsUtils: SearchPaymentsFilterUtils,
    private validation: SearchPaymentFilterValidation,
    private datePipe: DatePipe,
    private toastService: ToastService
  ) {}

  public filter: FormGroup<ISearchPaymentFilterForm> = this.searchPaymentsUtils.createDefaultFilterFormGroup();
  readonly multiselectDataSetsEnum = MultiselectDataSets;
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
      this.searchPaymentService.filter(this.searchPaymentsUtils.prepareSearchFilters(this.filter));
    }
    else {
      this.searchPaymentsUtils.showErrorMessages(this.filter);
    }
  }

  searchAndGenerateDoc() {
    if (this.filter.valid) {
      return;
    }
    this.searchPaymentService.filter(this.searchPaymentsUtils.prepareSearchFilters(this.filter));
    this.searchPaymentService.getPaymentsReport({
      isSBPReport: true,
      isManualParse: false,
      searchPayments: this.searchPaymentsUtils.prepareSearchFilters(this.filter)
    }).subscribe(buffer => {
      if (!!buffer) {
        XlsxHelper.saveAsExcelFile(
          buffer,
          `Отчет по СБП платежам_${ this.datePipe.transform(new Date(), "ddMMyyyy") }.xlsx`
        );
      }
      else {
        this.toastService.showErrorToast('Не удалось сформировать отчёт. Попробуйте еще раз');
      }
    });
  }

}
