import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tableColumns, transferDetailDefaultValue } from './view-transfer-details.constants';
import { ViewTransferDetailsService } from '../../../services/view-transfer-details/view-transfer-details.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';
import {prepareTransferDetails} from "./view-transfer-details.utils";
import {ITransferDetailsWithRetRefNumber, ItransferDetailsForm} from "./view-transfer-details.types";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-transfer-details',
  templateUrl: './view-transfer-details.component.html',
  styleUrls: ['./view-transfer-details.component.scss'],
})
export class ViewTransferDetailsComponent implements OnInit {
  
  transferDetailsForm: FormGroup<ItransferDetailsForm> = this.createForm();
  transferDetails: ITransferDetailsWithRetRefNumber = transferDetailDefaultValue;
  tableColumns = tableColumns;

  constructor(
    private activatedRoute: ActivatedRoute,
    private viewTransferDetailsService: ViewTransferDetailsService,
    private loadingService: LoadingService,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const currentTransferDetailsId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!currentTransferDetailsId) {
      return;
    }

    this.loadingService.showLoading();
    this.viewTransferDetailsService.getTransferDetails(currentTransferDetailsId).subscribe();
    this.viewTransferDetailsService.$transferDetailsState.subscribe(value => {
      this.loadingService.hideLoading();

      if (!value) {
        return;
      }

      this.transferDetails = prepareTransferDetails(value);

      const {statusHistory, ...details} = this.transferDetails;

      this.transferDetailsForm.setValue(
        {
          amount: details.amount,
          appCreationTime: details.appCreationTime,
          idPH: details.idPH,
          operatorLegalName: details.operatorLegalName,
          payeeAccount: details.payeeAccount,
          payeeBankBIC: details.payeeBankBIC,
          payeeInn: details.payeeInn,
          payeeName: details.payeeName,
          payerAccount: details.payerAccount,
          payerName: details.payerName,
          paymentID: details.paymentID,
          paymentPurpose: details.paymentPurpose,
          retRefNumber: details.retRefNumber,
          serviceName: details.serviceName
        }
      );

    });
  }

  createForm(): FormGroup<ItransferDetailsForm> {
    return this.fb.group<ItransferDetailsForm>({
      amount: new FormControl(null),
      appCreationTime: new FormControl(null),
      idPH: new FormControl(null),
      operatorLegalName: new FormControl(null),
      payeeAccount: new FormControl(null),
      payeeBankBIC: new FormControl(null),
      payeeInn: new FormControl(null),
      payeeName: new FormControl(null),
      payerAccount: new FormControl(null),
      payerName: new FormControl(null),
      paymentID: new FormControl(null),
      paymentPurpose: new FormControl(null),
      serviceName: new FormControl(null),
      retRefNumber: new FormControl(null)
    });
  }

  get hasAccessToComponent() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  onBack() {
    this.peNavigationService.goBack();
  }
  
}
