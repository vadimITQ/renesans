import { FormGroup } from "@angular/forms";
import { AntiFraudCheckFilterForm } from "src/app/core/pages/PE/anti-fraud-check/anti-fraud-check-filter/anti-fraud-checks-filter.types";
import { IBankOpsCheckFilterForm } from "src/app/core/pages/PE/bank-ops-check/bank-ops-check-filters/bank-ops-check-filters.types";
import { ManualChecksFilter } from "src/app/core/pages/PE/manual-checks/manual-checks-filter/manual-checks-filter.types";
import { ISearchPaymentFilterForm } from "src/app/core/pages/PE/search-payment/search-payment-filters/search-payment-filters.types";

export type IFormGroupWithDates = FormGroup<ManualChecksFilter> 
                                | FormGroup<ISearchPaymentFilterForm>
                                | FormGroup<IBankOpsCheckFilterForm>
                                | FormGroup<AntiFraudCheckFilterForm>;