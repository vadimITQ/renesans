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
    private validation: SearchPaymentFilterValidation
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
    // todo: implement me after API update
    // this.searchPaymentService.getSearchPayments(prepareSearchFilters(this.filters)).subscribe(response => {
    //   XlsxHelper.exportArrayToExcel(response.payments, Object.getOwnPropertyNames(response.payments[0]), 'Выгрузка_в_excel_test');
    // });
  }

}
