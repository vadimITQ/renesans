
import { Component, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { AntiFraudDetailsService } from "src/app/core/services/anti-fraud-checks/anti-fraud-details.service";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";

@Component({
    selector: "app-anti-fraud-details",
    templateUrl: "./anti-fraud-details.component.html",
    styleUrls: ["./anti-fraud-details.component.scss"]
})
export class AntiFraudDetailsComponent implements OnInit {

    constructor(
        private peRolesSerivce: PeRolesService,
        private antiFraudDetailsService: AntiFraudDetailsService
    ) {}

    public readonly labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };

    detailsData: any;

    get hasAccessToComponent(): boolean {
        return this.peRolesSerivce.hasAccessToAntiFraudCheck();
    }

    ngOnInit(): void {
        this.antiFraudDetailsService.getAntiFraudDetails().subscribe(data => {
            this.detailsData = data;
            PaymentEngineHelper.scrollToTop();
        });
    }

}