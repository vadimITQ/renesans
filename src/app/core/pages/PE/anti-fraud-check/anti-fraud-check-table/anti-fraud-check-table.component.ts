
import { Component, OnInit } from "@angular/core";
import { AntiFraudCheckService } from "src/app/core/services/anti-fraud-checks/anti-fraud-check.service";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";
import {IApplication} from "../../../../../shared/types/get-applications-list";
import {PeRolesService} from "../../../../services/auth/pe-roles.service";

@Component({
    selector: "pe-anti-fraud-check-table",
    templateUrl: "./anti-fraud-check-table.component.html",
    styleUrls: ["./anti-fraud-check-table.component.scss"]
})
export class AntiFraudCheckTableComponent implements OnInit {

    constructor(
        public antiFraudCheckService: AntiFraudCheckService,
        public peNavigationService: PeNavigationService,
        private peRolesService: PeRolesService,
    ) {}

    tableData: IApplication[] | null = null;

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.antiFraudCheckService.$tableData.subscribe(data => {
            this.tableData = data;
        });
    }

    goToAntiFraudDetails(idPE: string) {
        this.peNavigationService.goToAntiFraudDetails(idPE);
    }


  get hasAccessToSearchAgedOnly() {
    return this.peRolesService.hasAccessToSearchAgedOnly();
  }
}
