import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ManualChecksService } from '../../../../services/manual-checks/manual-checks.service';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { FormGroup } from '@angular/forms';
import { ManualChecksHelper } from './manual-checks-filter.utils';
import { ManualChecksValidation } from './manual-checks-filter.validation';
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { GetPaymentsResponse, ManualChecksFilter } from './manual-checks-filter.types';

@Component({
  selector: 'app-manual-checks-filter',
  templateUrl: './manual-checks-filter.component.html',
  styleUrls: ['./manual-checks-filter.component.scss'],
})
export class ManualChecksFilterComponent implements OnInit, OnDestroy {

  constructor(
    private mcService: ManualChecksService,
    private manualChecksHelper: ManualChecksHelper,
    private changeDetector: ChangeDetectorRef,
    private validation: ManualChecksValidation
  ) {}

  public multiselectDataSetsEnum = MultiselectDataSets;
  public $paymentsResponse!: Observable<GetPaymentsResponse[]>;
  public filter: FormGroup<ManualChecksFilter> = this.manualChecksHelper.createDefaultForm();
  public validateDates: boolean = false;

  ngOnDestroy(): void {
    this.mcService.componentState.$filters.next(this.filter);
  }

  ngOnInit(): void {
    if (this.mcService.componentState.$filters.value) {
      this.filter = this.mcService.componentState.$filters.value;
    }
    this.changeDetector.detectChanges();
  }

  clearFilter() {
    PEReactiveHelper.resetForm(this.filter);
  }

  searchPayments(): void {
    this.validation.validateFilter(this.filter, true);
    if (this.filter.valid){
      this.mcService.filter(this.manualChecksHelper.prepareSearchFilters(this.filter));
    }
    else {
      this.manualChecksHelper.showErrorMessages(this.filter);
    }
  }

}

