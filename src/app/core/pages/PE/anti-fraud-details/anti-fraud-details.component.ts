
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { AntiFraudDetailsService } from "src/app/core/services/anti-fraud-checks/anti-fraud-details.service";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "app-anti-fraud-details",
    templateUrl: "./anti-fraud-details.component.html",
    styleUrls: ["./anti-fraud-details.component.scss"]
})
export class AntiFraudDetailsComponent implements OnInit, OnDestroy {

    constructor(
        private peRolesSerivce: PeRolesService,
        private antiFraudDetailsService: AntiFraudDetailsService,
        private activatedRoute: ActivatedRoute
    ) {}

    public readonly labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };

    subscribtions: { [key: string]: Subscription | null } = {
        getManualCheckMode: null
    };
    readonly: boolean = true;
    paymentID: string = '';
    detailsData: any;

    get hasAccessToComponent(): boolean {
        return this.peRolesSerivce.hasAccessToAntiFraudCheck();
    }

    ngOnDestroy(): void {
        if (!!this.subscribtions['getManualCheckMode']){
            this.subscribtions['getManualCheckMode'].unsubscribe();
        }
    }

    ngOnInit(): void {
        this.subscribtions['getManualCheckMode'] = this.activatedRoute.params.subscribe(params => {
            this.paymentID = params['id'];
            this.antiFraudDetailsService.getManualCheckMode(this.paymentID).subscribe(checkResponse => {
                this.readonly = checkResponse.readOnly
                if (!checkResponse.readOnly) {
                    this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '2');
                }
            });
            this.antiFraudDetailsService.getAntiFraudDetails().subscribe(data => {
                this.detailsData = data;
                PaymentEngineHelper.scrollToTop();
            });
        });
    }

    back() {
        this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '1');
    }

    approve() {
        this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '3');
    }

    cancel() {
        this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '5');
    }

}