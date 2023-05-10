
import { Component } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";

@Component({
    selector: "app-bank-ops-details",
    templateUrl: "./bank-ops-details.component.html",
    styleUrls: ["./bank-ops-details.component.scss"]
})
export class BankOpsDetailsComponent {
    
    constructor(private peRolesService: PeRolesService) { }

    get hasAccessToComponent(): boolean {
        return this.peRolesService.hasAccessToBankOpsDetails();
    }

}