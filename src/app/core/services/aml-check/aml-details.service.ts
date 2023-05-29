
import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import {amlDetailsMockData} from "../../pages/PE/aml-details/aml-details.mock";

@Injectable({
    providedIn: "root"
})
export class AmlDetailsService {
    getAmlDetails() {
        return of(amlDetailsMockData).pipe(delay(500));
    }

}
