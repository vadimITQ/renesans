
import { Component, OnInit, OnDestroy } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { AntiFraudDetailsService } from "src/app/core/services/anti-fraud-checks/anti-fraud-details.service";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { AntiFraudDetailsForm, IAntiFraudAutoCheck } from "./anti-fraud-details.types";
import { ActivatedRoute } from '@angular/router';
import { IAntiFraudDetails } from './anti-fraud-details.types';
import { prepareAntiFraudDetails } from './anti-fraud-details.utils';
import { Subscription } from 'rxjs';
import { IManualCheck } from "src/app/shared/types/get-application-details";

@Component({
  selector: 'app-anti-fraud-details',
  templateUrl: './anti-fraud-details.component.html',
  styleUrls: ['./anti-fraud-details.component.scss'],
})
export class AntiFraudDetailsComponent implements OnInit, OnDestroy {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private peRolesService: PeRolesService,
    private antiFraudDetailsService: AntiFraudDetailsService,
    private fb: FormBuilder
  ) {}

  public readonly labelsStyle: { [key: string]: string } = {
    'font-weight': '500',
  };

  public form: FormGroup<AntiFraudDetailsForm> = this.createEmptyForm();
  public paymentID: string = '';
  public subscriptions: { [key: string]: Subscription } = {};
  public loading: boolean = false;
  public readonly: boolean = true;
 
  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToAntiFraudCheck();
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach(subscription => subscription?.unsubscribe());
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

    const getAntiFraudDetails = this.antiFraudDetailsService.getAntiFraudDetails(antiFraudDetailsId).subscribe(value => {

      if (!value) {
        this.loading = false;
        return;
      }

      this.paymentID = value.payment.paymentID;

      this.loading = false;

      const getManualCheckMode = this.antiFraudDetailsService.getManualCheckMode(this.paymentID).subscribe(checkResponse => {
        this.readonly = checkResponse.readOnly;
        if (!checkResponse.readOnly) {
          this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '2');
        }
      });
      this.subscriptions['getManualCheckMode'] = getManualCheckMode;

      const antiFraudDeatails = prepareAntiFraudDetails(value);
      
      this.form.patchValue({
        amount: antiFraudDeatails.amount,
        payeeAccount: antiFraudDeatails.payeeAccount,
        payeeBIC: antiFraudDeatails.payeeBIC,
        payeeINN: antiFraudDeatails.payeeINN,
        payeeName: antiFraudDeatails.payeeName,
        payerAccount: antiFraudDeatails.payerAccount,
        payerName: antiFraudDeatails.payerName,
        paymentID: antiFraudDeatails.paymentID,
        paymentPurpose: antiFraudDeatails.paymentPurpose,
        pmtCreationTime: antiFraudDeatails.pmtCreationTime,
        autoChecks: antiFraudDeatails.autoChecks,
        manualChecks: antiFraudDeatails.manualChecks, 
      });

      PaymentEngineHelper.scrollToTop();
    });
    this.subscriptions['getAntiFraudDetails'] = getAntiFraudDetails;
  }

  back() {
    this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '1');
  }

  approve() {
    this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '3');
  }

  cancel() {
    this.antiFraudDetailsService.saveManualCheckMode(this.paymentID, '5');
  }
  
}
