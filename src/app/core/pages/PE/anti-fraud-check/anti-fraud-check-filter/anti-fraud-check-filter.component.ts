
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { RolesService } from "src/app/core/services/auth/roles.service";
import { MultiselectDataSets } from "src/app/shared/enums/datasets.enums";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";
import { AntiFraudChecksFilterUtils } from "./anti-fraud-checks-filter.utils";
import { Validation } from "src/app/shared/validation/types";
import { validateDates } from "../../manual-checks/manual-checks-filter/manual-checks-filter.validation";
import { AntiFraudChecksValidation } from "./anti-fraud-checks-filter.validation";
import { ToastService } from "src/app/shared/services/toast.service";
import { AntiFraudCheckService } from "src/app/core/services/anti-fraud-checks/anti-fraud-check.service";

@Component({
    selector: "pe-anti-fraud-check-filter",
    templateUrl: "./anti-fraud-check-filter.component.html",
    styleUrls: ["./anti-fraud-check-filter.component.scss"]
})
export class AntiFraudCheckFilterComponent implements OnInit, OnDestroy {

    constructor(
        private rolesService: RolesService,
        private changeDetector: ChangeDetectorRef,
        private toast: ToastService,
        private antiFraudCheckService: AntiFraudCheckService
    ) {}

    public multiselectDataSets: typeof MultiselectDataSets = MultiselectDataSets;
    public antiFraudCheckFilter!: AntiFraudCheckFilter;
    public validations: Validation = {};

    get showCheckbox(): boolean {
        return true;
        return this.rolesService.hasRole("AP.PEWeb.AntiFraudControl");
    }

    ngOnDestroy(): void {
        console.log(this.antiFraudCheckService.$filters.value);
        this.antiFraudCheckService.$filters.next(this.antiFraudCheckFilter);
    }

    ngOnInit(): void {
        if (!!this.antiFraudCheckService.$filters.value){
            this.antiFraudCheckFilter = this.antiFraudCheckService.$filters.value;
        }
        else {
            this.antiFraudCheckFilter = AntiFraudChecksFilterUtils.getDefaultFilter();
        }

        this.changeDetector.detectChanges();
    }

    public clear(): void {
        this.antiFraudCheckFilter = {
            ...AntiFraudChecksFilterUtils.getDefaultFilter(),
          dateTimeFrom: null,
          dateTimeTo: null
        };
        this.validations = {};
    }

    public search(): void {
        if (this.valid()) {
            this.antiFraudCheckService.filter(AntiFraudChecksFilterUtils.prepareAntiFraudFilters(this.antiFraudCheckFilter));
            this.antiFraudCheckService.$filters.next(this.antiFraudCheckFilter);
        }
        else {
            console.log("filter is not valid");
        }
    }

    valid(): boolean {

        const validationAnyField = AntiFraudChecksValidation.validateAnyField(this.antiFraudCheckFilter);
        if (!!validationAnyField){
            this.validations = { ...this.validations,  ...validationAnyField };
            this.toast.showErrorToast("Заполните хотя бы одно из полей фильтров или укажите интервал дат");
            return false;
        }

        const datesValid = this.validateDates();
        if (!datesValid){
            return false;
        }

        return true;

    }

    public validateDates(): boolean {
        this.validations = {};
        const { dateFromValidation, dateToValidation } = validateDates(
            this.antiFraudCheckFilter.dateTimeFrom?.toISOString() ?? "",
            this.antiFraudCheckFilter.dateTimeTo?.toISOString() ?? ""
        );
        this.validations["dateTimeFrom"] = dateFromValidation;
        this.validations["dateTimeTo"] = dateToValidation;
        if (!!this.validations["dateTimeFrom"] || !!this.validations["dateTimeTo"]) {
            return false;
        }
        else {
            return true;
        }
    }

}
