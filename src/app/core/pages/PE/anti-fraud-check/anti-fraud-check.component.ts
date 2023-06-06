
import { Component } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";

@Component({
    selector: "app-anti-fraud-check",
    templateUrl: "./anti-fraud-check.component.html",
    styleUrls: ["./anti-fraud-check.component.scss"]
})
export class AntiFraudCheckComponent {

    constructor(
        public peNavigationService: PeNavigationService,
        private peRolesSerivce: PeRolesService
    ){}

    get hasAccessToComponent(): boolean {
        return this.peRolesSerivce.hasAccessToAntiFraudCheck();
    }

}