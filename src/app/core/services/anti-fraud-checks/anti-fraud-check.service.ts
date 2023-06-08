
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, delay, of } from "rxjs";
import { AntiFraudCheckTable, AntiFraudChecksItem } from "../../pages/PE/anti-fraud-check/anti-fraud-check-table/anti-fraud-check-table.types";
import { antiFraudChecksMock } from "../../pages/PE/anti-fraud-check/anti-fraud-check-table/anti-fraud-check-table.mock";
import { AntiFraudCheckFilter, AntiFraudCheckFilterForm } from "../../pages/PE/anti-fraud-check/anti-fraud-check-filter/anti-fraud-checks-filter.types";
import { Pagination, TableService } from "src/app/shared/services/table.service";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class AntiFraudCheckService extends TableService<AntiFraudChecksItem, AntiFraudCheckFilter> {

    $filter: BehaviorSubject<FormGroup<AntiFraudCheckFilterForm> | null> = new BehaviorSubject<FormGroup<AntiFraudCheckFilterForm> | null>(null);

    constructor(){
        function getAntiFraudChecksData(filter: AntiFraudCheckFilter, pagination: Pagination){ 
            return of(antiFraudChecksMock).pipe(delay(2000));
        }
        super(getAntiFraudChecksData);
    }

    public getAntiFraudChecksData(): Observable<AntiFraudCheckTable> {
        return of(antiFraudChecksMock).pipe(delay(2000));
    }

}