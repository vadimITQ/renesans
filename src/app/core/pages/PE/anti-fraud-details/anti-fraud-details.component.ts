
import { Component, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { AntiFraudDetailsService } from "src/app/core/services/anti-fraud-checks/anti-fraud-details.service";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AntiFraudDetailsForm, IAntiFraudAutoCheck } from "./anti-fraud-details.types";
import { ActivatedRoute } from '@angular/router';
import { prepareAntiFraudDetails } from './anti-fraud-details.utils';
import { IManualCheck } from "src/app/shared/types/get-application-details";
import { PeConfig } from "src/app/shared/config/config";
import { ToastService } from "src/app/shared/services/toast.service";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";

@Component({
  selector: 'app-anti-fraud-details',
  templateUrl: './anti-fraud-details.component.html',
  styleUrls: ['./anti-fraud-details.component.scss'],
})
export class AntiFraudDetailsComponent implements OnInit {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private peRolesService: PeRolesService,
    private antiFraudDetailsService: AntiFraudDetailsService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private peNavigation: PeNavigationService
  ) {}

  public readonly labelsStyle: { [key: string]: string } = {
    'font-weight': '500',
  };

  public form: FormGroup<AntiFraudDetailsForm> = this.createEmptyForm();
  public loading: boolean = false;
  
  public paymentID: string = '';
  public readonly: boolean = true;
  public startDate: Date | null = null;

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToAntiFraudCheck();
  }
  
  get applicationExpired(): boolean { 
    if (!!this.startDate){
      const diff = new Date().getTime() - this.startDate.getTime();
      return (diff / 1000) > PeConfig.manualAntiFraudCheckTimeOut;
    }
    else {
      return false;
    }
  }

  createEmptyForm(): FormGroup<AntiFraudDetailsForm>{
    return this.fb.group<AntiFraudDetailsForm>({
      autoChecks: this.fb.array<IAntiFraudAutoCheck>([]),
      manualChecks: this.fb.array<IManualCheck>([]),
      paymentID: new FormControl(null),
      pmtCreationTime: new FormControl(null),
      payerName: new FormControl(null),
      payerAccount: new FormControl(null),
      payeeName: new FormControl(null),
      payeeAccount: new FormControl(null),
      payeeINN: new FormControl(null),
      payeeBIC: new FormControl(null),
      paymentPurpose: new FormControl(null),
      amount: new FormControl(null)
    });
  }

  ngOnInit(): void {

    const antiFraudDetailsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.disable();

    if (!antiFraudDetailsId) {
      return;
    }

    this.loading = true;

    this.antiFraudDetailsService.getAntiFraudDetails(antiFraudDetailsId).subscribe(value => {

      if (!value) {
        this.loading = false;
        return;
      }

      this.paymentID = value.payment.paymentID;
      this.loading = false;

      this.antiFraudDetailsService.getManualCheckMode(this.paymentID).subscribe(checkResponse => {
        this.readonly = checkResponse.readOnly;
        if (!checkResponse.readOnly) {
          this.form.enable();
          this.startDate = new Date();
          this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '2').subscribe();
        }
      });

      const antiFraudDeatails = prepareAntiFraudDetails(value);

      this.form.patchValue(antiFraudDeatails);

      PaymentEngineHelper.scrollToTop();
    });

  }

  back() {
    if (!this.readonly){
      this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '1').subscribe();
    }
  }

  approve() {
    if (this.readonly) { return; }
    if (this.applicationExpired) {
      this.toastService.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '3').subscribe(() => this.peNavigation.goBack());
    }
  }

  cancel() {
    if (this.readonly) { return; }
    if (this.applicationExpired) {
      this.toastService.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '5').subscribe(() => this.peNavigation.goBack());
    }
  }

}
