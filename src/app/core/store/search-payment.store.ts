import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ISearchPaymentFilters } from '../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { ISearchPayment } from '../pages/PE/search-payment/search-payment.types';
import { defineDefaultFiltersValues } from '../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';
import { Validation } from 'src/app/shared/validation/types';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

export interface ISearchPaymentStore {
  filters: ISearchPaymentFilters;
  tableData: ISearchPayment[] | null;
  validations: Validation;
  test: string;
}

const defaultState: ISearchPaymentStore = {
  filters: defineDefaultFiltersValues(),
  tableData: null,
  validations: {},
  test: ""
};

@Injectable()
export class SearchPaymentStore extends ComponentStore<ISearchPaymentStore> {
  constructor() {
    super(defaultState);
  }

  readonly testStore$ = this.select((state) => state.test);
  readonly testUpdate = this.updater((state, test: string) => ({...state, test: test}));
  readonly testEffect = this.effect((test$: Observable<string>) => {
    this.testUpdate(test$);
    return test$.pipe(tapResponse(test => {this.testUpdate(test)}, e => {}));
  });

  readonly filters$ = this.select((state) => state.filters);
  readonly tableData$ = this.select((state) => state.tableData);
  readonly validations$ = this.select((state) => state.validations)
  readonly store$ = this.select((state) => {
    this.filters$,
    this.tableData$,
    this.validations$,
    (filters: ISearchPaymentFilters, tableData: ISearchPayment[] | null, validations: Validation) => ({
      filters, tableData, validations
    })
  });

  readonly updateFilters = this.updater((state, filters: ISearchPaymentFilters) => ({ ...state, filters }));
  readonly updateTableData = this.updater((state, tableData: ISearchPayment[] | null) => ({ ...state, tableData }));
  readonly updateValidations = this.updater((state, validations: Validation) => ({...state, validations}));

  readonly effectFilter = this.effect((filter$: Observable<ISearchPaymentFilters>) => {
    return filter$.pipe(
      tapResponse(filter => {
          this.updateFilters(filter);
        },
        e => {}
      )
    );
  });

  readonly effectTableData = this.effect((tableData$: Observable<ISearchPayment[] | null>) => {
    return tableData$.pipe(
      tapResponse(tableData => {
          this.updateTableData(tableData);
        },
        e => {}
      )
    );
  });

  readonly effectValidations = this.effect((validations$: Observable<Validation>) => {
    return validations$.pipe(
      tapResponse(validations => {
          this.updateValidations(validations);
        },
        e => {}
      )
    );
  });

}
