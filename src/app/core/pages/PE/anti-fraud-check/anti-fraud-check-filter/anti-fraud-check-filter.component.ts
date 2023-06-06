
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { RolesService } from "src/app/core/services/auth/roles.service";
import { MultiselectDataSets } from "src/app/shared/enums/datasets.enums";
import { AntiFraudCheckFilter } from "./anti-fraud-checks-filter.types";
import { AntiFraudChecksFilterUtils } from "./anti-fraud-checks-filter.utils";
import { Validation } from "src/app/shared/validation/types";
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
        console.log(this.antiFraudCheckService.$filter.value);
        this.antiFraudCheckService.$filter.next(this.antiFraudCheckFilter);
    }

    ngOnInit(): void {
        if (!!this.antiFraudCheckService.$filter.value){
            this.antiFraudCheckFilter = this.antiFraudCheckService.$filter.value;
        }
        else {
            this.antiFraudCheckFilter = AntiFraudChecksFilterUtils.getDefaultFilter();
        }
        
        this.changeDetector.detectChanges();
    }

    public clear(): void {
        this.antiFraudCheckFilter = { 
            ...AntiFraudChecksFilterUtils.getDefaultFilter(),
            dateFrom: null,
            dateTo: null
        };
        this.validations = {};
    }

    public search(): void {
        if (this.valid()) {
            this.antiFraudCheckService.filter(this.antiFraudCheckFilter);
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
        // const { dateFromValidation, dateToValidation } = validateDates(
        //     this.antiFraudCheckFilter.dateFrom, 
        //     this.antiFraudCheckFilter.dateTo
        // );
        // this.validations["dateFrom"] = dateFromValidation;
        // this.validations["dateTo"] = dateToValidation;
        if (!!this.validations["dateFrom"] || !!this.validations["dateTo"]) {
            return false;
        } 
        else {
            return true;
        }
    }

}