
import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import { antiFraudDetails } from "../../pages/PE/anti-fraud-details/anti-fraud-details.mock";

@Injectable({
    providedIn: "root"
})
export class AntiFraudDetailsService {

    public getAntiFraudDetails(): Observable<any> {
        return of(antiFraudDetails).pipe(delay(2000));
    }

}