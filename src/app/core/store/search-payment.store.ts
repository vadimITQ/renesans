import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ISearchPaymentFilters } from '../pages/PE/search-payment/search-payment-filters/search-payment-filters.types';
import { ISearchPayment } from '../pages/PE/search-payment/search-payment.types';
import { defineDefaultFiltersValues } from '../pages/PE/search-payment/search-payment-filters/search-payment-filters.utils';

export interface ISearchPaymentStore {
  filters: ISearchPaymentFilters;
  tableData: ISearchPayment[] | null;
}

const defaultState: ISearchPaymentStore = {
  filters: defineDefaultFiltersValues(),
  tableData: null,
};

@Injectable()
export class SearchPaymentStore extends ComponentStore<ISearchPaymentStore> {
  constructor() {
    super(defaultState);
  }

  readonly filters$ = this.select(({ filters }) => filters);
  readonly tableData$ = this.select(({ tableData }) => tableData);

  readonly setFilters = this.updater((state, filters: ISearchPaymentFilters) => ({ ...state, filters }));
  readonly setTableData = this.updater((state, tableData: ISearchPayment[] | null) => ({ ...state, tableData }));
}
