
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { RolesService } from "src/app/core/services/auth/roles.service";
import { MultiselectDataSets } from "src/app/shared/enums/datasets.enums";
import { AntiFraudCheckFilterForm } from "./anti-fraud-checks-filter.types";
import { AntiFraudChecksFilterUtils } from "./anti-fraud-checks-filter.utils";
import { AntiFraudChecksValidation } from "./anti-fraud-checks-filter.validation";
import { AntiFraudCheckService } from "src/app/core/services/anti-fraud-checks/anti-fraud-check.service";
import { FormGroup } from "@angular/forms";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";

@Component({
    selector: "pe-anti-fraud-check-filter",
    templateUrl: "./anti-fraud-check-filter.component.html",
    styleUrls: ["./anti-fraud-check-filter.component.scss"]
})
export class AntiFraudCheckFilterComponent implements OnInit, OnDestroy {

    constructor(
        private rolesService: RolesService,
        private changeDetector: ChangeDetectorRef,
        private antiFraudCheckService: AntiFraudCheckService,
        private utils: AntiFraudChecksFilterUtils,
        private validation: AntiFraudChecksValidation
    ) {}

    public multiselectDataSets: typeof MultiselectDataSets = MultiselectDataSets;
    public filter: FormGroup<AntiFraudCheckFilterForm> = this.utils.createDefaultFilter();

    get showCheckbox(): boolean {
        return true;
        return this.rolesService.hasRole("AP.PEWeb.AntiFraudControl");
    }

    ngOnDestroy(): void {
        this.antiFraudCheckService.$filter.next(this.filter);
    }

    ngOnInit(): void {
        if (!!this.antiFraudCheckService.$filter.value){
            this.filter = this.antiFraudCheckService.$filter.value;
        }
        // this.changeDetector.detectChanges();
    }

    public clear(): void {
        PEReactiveHelper.resetForm(this.filter);
    }

    public search(): void {
        this.validation.validateFilter(this.filter, true);
        if (this.filter.valid) {
            this.antiFraudCheckService.filter(this.utils.prepareAntiFraudFilters(this.filter));
        }
        else {
            this.utils.showErrorMessages(this.filter);
        }
    }

}
