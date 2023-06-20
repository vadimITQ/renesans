import { BehaviorSubject, Observable } from 'rxjs';

export interface Pagination {
  offset: number;
  limit: number;
}

interface TableResponse<TData> {
  count: number;
  limit: number | null;
  offset: number | null;
  data: TData[];
}

type FetchTableDataFn<TData, TFilters> = (filters: TFilters, pagination: Pagination) => Observable<TableResponse<TData>>;

export class TableService<TData, TFilters> {
  $tableData: BehaviorSubject<TData[] | null> = new BehaviorSubject<TData[] | null>(null);
  $loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly fetchFn: FetchTableDataFn<TData, TFilters> | null = null;
  private filters: TFilters = {} as TFilters;
  pagination: Pagination = { offset: 0, limit: 5 };
  rowsPerPageOptions: number[] = [5, 10, 20, 50, 100];
  count: number = 0;

  constructor(private fetchTableDataFn: FetchTableDataFn<TData, TFilters>, private startFilters?: TFilters) {
    this.fetchFn = fetchTableDataFn;
    if (startFilters) {
      this.filters = startFilters;
    }
  }

  filter(filters: TFilters) {
    this.filters = filters;
    this.pagination = { ...this.pagination, offset: 0 };
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
    const sub = this.fetchFn(this.filters, this.pagination).subscribe(response => {
      this.$tableData.next(response.data);
      this.count = response.count;

      this.$loading.next(false);
      sub.unsubscribe();
    });
  }
}
