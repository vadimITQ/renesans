
import { Component, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { AntiFraudDetailsService } from "src/app/core/services/anti-fraud-checks/anti-fraud-details.service";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AntiFraudDetailsForm } from "./anti-fraud-details.types";

@Component({
    selector: "app-anti-fraud-details",
    templateUrl: "./anti-fraud-details.component.html",
    styleUrls: ["./anti-fraud-details.component.scss"]
})
export class AntiFraudDetailsComponent implements OnInit {

    constructor(
        private peRolesSerivce: PeRolesService,
        private antiFraudDetailsService: AntiFraudDetailsService,
        private fb: FormBuilder
    ) {}

    public readonly labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };

    form: FormGroup<AntiFraudDetailsForm> = this.createForm();
    detailsData: any;

    get hasAccessToComponent(): boolean {
        return this.peRolesSerivce.hasAccessToAntiFraudCheck();
    }

    ngOnInit(): void {
        this.form.disable();
        this.antiFraudDetailsService.getAntiFraudDetails().subscribe(data => {
            this.detailsData = data;
            this.form.setValue(data.antiFraudInfo);
            PaymentEngineHelper.scrollToTop();
        });
    }

    createForm(): FormGroup<AntiFraudDetailsForm>{
        return this.fb.group<AntiFraudDetailsForm>({
            IdPE: new FormControl(''),
            paymentDatePE: new FormControl(''),
            fioPayer: new FormControl(''),
            writeOffAccount: new FormControl(''),
            recipientFio: new FormControl(''),
            recipientAccount: new FormControl(''),
            recipientINN: new FormControl(''),
            recipientBankBIK: new FormControl(''),
            appointment: new FormControl(''),
            transferAmount: new FormControl(''),
            ip: new FormControl(''),
            userAgent: new FormControl('')
        });
    }

}