
import { Component, OnInit } from "@angular/core";
import { AntiFraudCheckService } from "src/app/core/services/anti-fraud-checks/anti-fraud-check.service";
import { AntiFraudChecksItem } from "./anti-fraud-check-table.types";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";

@Component({
    selector: "pe-anti-fraud-check-table",
    templateUrl: "./anti-fraud-check-table.component.html",
    styleUrls: ["./anti-fraud-check-table.component.scss"]
})
export class AntiFraudCheckTableComponent implements OnInit {

    constructor(
        public antiFraudCheckService: AntiFraudCheckService,
        public peNavigationService: PeNavigationService
    ) {}

    tableData: AntiFraudChecksItem[] | null = null;

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

}