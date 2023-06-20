import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AmlCheckFiltersUtils,
} from './aml-check-filters.utils';
import { MultiselectDataSets } from 'src/app/shared/enums/datasets.enums';
import {IAmlCheckFiltersForm} from "./aml-check-filters.types";
import {AmlCheckService} from "../../../../services/aml-check/aml-check.service";
import {PeRolesService} from "../../../../services/auth/pe-roles.service";
import { PEReactiveHelper } from 'src/app/shared/components/reactive-controls/utils';
import { AmlCheckFilterValidation } from "./aml-check-filter.validation";

@Component({
  selector: 'app-aml-check-filters',
  templateUrl: './aml-check-filters.component.html',
  styleUrls: ['./aml-check-filters.component.scss'],
})
export class AmlCheckFiltersComponent implements OnInit, OnDestroy {
  
  constructor(
    private amlCheckService: AmlCheckService,
    private changeDetectionRef: ChangeDetectorRef,
    private peRolesService: PeRolesService,
    private amlUtils: AmlCheckFiltersUtils,
    private validation: AmlCheckFilterValidation
  ) {}

  public filter: FormGroup<IAmlCheckFiltersForm> = this.amlUtils.createDefaultFilter();
  public multiselectDataSetsEnum = MultiselectDataSets;

  get hasAccessToSearchOnlyExpired() {
    return true;
    // return this.peRolesService.hasAccessToSearchOnlyExpired();
  }

  ngOnDestroy(): void {
    this.amlCheckService.$filter.next(this.filter);
  }

  ngOnInit(): void {
    if (this.amlCheckService.$filter.value) {
      this.filter = this.amlCheckService.$filter.value;
    }
    this.changeDetectionRef.detectChanges();
  }

  onClear() {
    PEReactiveHelper.resetForm(this.filter);
  }

  onSearch() {

    this.validation.validateFilter(this.filter, true);

    if (this.filter.valid){
      this.amlCheckService.filter(this.amlUtils.prepareFilterValues(this.filter));
    }
    else {
      this.amlUtils.showErrorMessages(this.filter);
    }

  }

}
