
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AntiFraudCheckService } from "src/app/core/services/anti-fraud-checks/anti-fraud-check.service";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";
import {IApplication} from "../../../../../shared/types/get-applications-list";
import {PeRolesService} from "../../../../services/auth/pe-roles.service";
import { ToastService } from "src/app/shared/services/toast.service";
import { Subscription } from "rxjs";

@Component({
    selector: "pe-anti-fraud-check-table",
    templateUrl: "./anti-fraud-check-table.component.html",
    styleUrls: ["./anti-fraud-check-table.component.scss"]
})
export class AntiFraudCheckTableComponent implements OnInit, OnDestroy {

    constructor(
        public antiFraudCheckService: AntiFraudCheckService,
        public peNavigationService: PeNavigationService,
        private peRolesService: PeRolesService,
        private toastService: ToastService
    ) {}

    public tableData: IApplication[] | null | undefined = null;
    public skipFirst: boolean = true;
    public antiFraudTableDataSubscribtion!: Subscription;

    ngOnDestroy(): void {
        if (this.antiFraudTableDataSubscribtion){
            this.antiFraudTableDataSubscribtion.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.antiFraudTableDataSubscribtion = this.antiFraudCheckService.$tableData.subscribe(data => {
            this.tableData = data;
            if (this.skipFirst) {
                this.skipFirst = false;
            }
            else if (data !== undefined && !this.tableData?.length) {
                this.toastService.showWarnToast('Ничего не найдено, проверьте параметры запроса и интервалы дат');
            }
        });
    }

    goToAntiFraudDetails(idPE: string) {
        this.peNavigationService.goToAntiFraudDetails(idPE);
    }

    get hasAccessToSearchAgedOnly() {
      return this.peRolesService.hasAccessToSearchAgedOnly();
    }
    
}
