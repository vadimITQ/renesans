import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { ManualChecksService } from '../../../../services/manual-checks/manual-checks.service';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { FormGroup } from '@angular/forms';
import { ManualChecksHelper } from './manual-checks-filter.utils';
import { prepareSearchFilters } from '../../search-payment/search-payment-filters/search-payment-filters.utils';
import { ManualChecksValidation } from './manual-checks-filter.validation';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss'],
})
export class ManualChecksFilterComponent implements OnInit, OnDestroy {

  constructor(
    private mcService: ManualChecksService,
    private manualChecksHelper: ManualChecksHelper,
    public validation: ManualChecksValidation
  ) {}

  public multiselectDataSetsEnum = MultiselectDataSets;
  public $paymentsResponse!: Observable<GetPaymentsResponse[]>;
  public filter: FormGroup = this.manualChecksHelper.createDefaultForm();
  public validateDates: boolean = false;

  ngOnDestroy(): void {
    this.mcService.componentState.$filters.next(this.filter);
  }

  ngOnInit(): void {
    if (this.mcService.componentState.$filters.value) {
      this.filter = this.mcService.componentState.$filters.value;
    }
    else {
      this.filter.setValue(this.manualChecksHelper.defineDefaultFiltersValues());
    }
  }

  clearFilter() {
    this.filter.setValue({});
  }

  searchPayments() {
    if (this.filter.valid){
      this.mcService.filter(this.manualChecksHelper.prepareSearchFilters(this.filter));
    }
  }

}

