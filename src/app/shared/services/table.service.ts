import { BehaviorSubject, Observable } from 'rxjs';

export type Pagination = {
  offset: number;
  limit: number;
};

type TableResponse<TData> = {
  count: number;
  limit: number | null;
  offset: number | null;
  data: TData[];
};

type FetchTableDataFn<TData, TFilters> = (filters: TFilters, pagination: Pagination) => Observable<TableResponse<TData>>;

export class TableService<TData, TFilters> {
  $tableData: BehaviorSubject<TData[] | null> = new BehaviorSubject<TData[] | null>(null);
  $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly fetchFn: FetchTableDataFn<TData, TFilters> | null = null;
  private filters: TFilters = {} as TFilters;
  pagination: Pagination = { offset: 0, limit: 20 };
  rowsPerPageOptions: number[] = [20, 50, 100];
  count: number = 0;

  constructor(private fetchTableDataFn: FetchTableDataFn<TData, TFilters>, private startFilters?: TFilters) {
    this.fetchFn = fetchTableDataFn;
    if (startFilters) {
      this.filters = startFilters;
    }
  }

  filter(filters: TFilters) {
    this.filters = filters;
    this.fetch();
  }

  paginate({ first, rows }: { first: number; rows: number }) {
    this.pagination = { offset: first, limit: rows };
    this.fetch();
  }

  fetch() {
    if (!this.fetchFn) {
      throw new Error('Please, provide fetch table data function');
    }
    this.$loading.next(true);
    this.fetchFn(this.filters, this.pagination).subscribe(response => {
      this.$tableData.next(response.data);
      this.count = response.count;

      this.$loading.next(false);
    });
  }
}
