import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import { IBankOpsCheckFilterForm} from "./bank-ops-check-filters.types";
import { BankOpsCheckService} from "../../../../services/bank-ops-check/bank-ops-check.service";
import { BankOpsCheckFilterValidation } from "./bank-ops-check-filter.validation";
import { BankOpsCheckFilterUtils } from "./bank-ops-check-filters.utils";
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';

@Component({
  selector: 'app-bank-ops-check-filters',
  templateUrl: './bank-ops-check-filters.component.html',
  styleUrls: ['./bank-ops-check-filters.component.scss'],
})
export class BankOpsCheckFiltersComponent implements OnInit, OnDestroy {

  constructor(
    private bankOpsCheckService: BankOpsCheckService,
    private changeDetectionRef: ChangeDetectorRef,
    private bankOpsService: BankOpsCheckService,
    private bankOpsUtils: BankOpsCheckFilterUtils,
    private validation: BankOpsCheckFilterValidation
  ) {}

  public filter: FormGroup<IBankOpsCheckFilterForm> = this.bankOpsUtils.createDefaultForm();
  readonly multiselectDataSetsEnum = MultiselectDataSets;

  ngOnDestroy(): void {
    this.bankOpsCheckService.$filter.next(this.filter);
  }

  ngOnInit(): void {
    if (this.bankOpsCheckService.$filter.value) {
      this.filter = this.bankOpsCheckService.$filter.value;
    }
    this.changeDetectionRef.detectChanges();
  }

  onClear() {
    PEReactiveHelper.resetForm(this.filter)
  }

  onSearch() {
    this.validation.validateFilter(this.filter, true);
    if (this.filter.valid){
      this.bankOpsService.filter(this.bankOpsUtils.prepareSearchFilter(this.filter));
    }
    else{
      this.bankOpsUtils.showErrorMessages(this.filter);
    }
  }

}
