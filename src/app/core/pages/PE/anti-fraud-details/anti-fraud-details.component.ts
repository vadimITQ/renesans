import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';
import { AntiFraudDetailsService } from 'src/app/core/services/anti-fraud-checks/anti-fraud-details.service';
import { PaymentEngineHelper } from 'src/app/shared/classes/pe-helper';
import { ActivatedRoute } from '@angular/router';
import { IAntiFraudDetails } from './anti-fraud-details.types';
import { prepareAntiFraudDetails } from './anti-fraud-details.utils';
import { Subscription } from 'rxjs';

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
  ) {}

  public readonly labelsStyle: { [key: string]: string } = {
    'font-weight': '500',
  };

  subscriptions: { [key: string]: Subscription } = {};
  readonly: boolean = true;
  paymentID: string = '';
  public antiFraudDetails: IAntiFraudDetails = prepareAntiFraudDetails(null);
  public loading: boolean = false;

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToAntiFraudCheck();
  }

  ngOnDestroy(): void {
    Object.values(this.subscriptions).forEach(subscription => subscription?.unsubscribe());
  }

  ngOnInit(): void {
    const antiFraudDetailsId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!antiFraudDetailsId) {
      return;
    }
    this.loading = true;

    const getAntiFraudDetails = this.antiFraudDetailsService.getAntiFraudDetails(antiFraudDetailsId).subscribe(value => {
      PaymentEngineHelper.scrollToTop();

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

      this.antiFraudDetails = prepareAntiFraudDetails(value);
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
