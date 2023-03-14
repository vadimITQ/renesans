import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tableColumns, transferDetailDefaultValue } from './view-transfer-details.constants';
import { RouterPath } from '../../../../shared/enums/router.enums';
import { ViewTransferDetailsService } from '../../../services/view-transfer-details/view-transfer-details.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { defineTransferDetailsData } from './view-transfer-details.utils';
import { IViewTransferDetails } from './view-transfer-details.types';

@Component({
  selector: 'app-view-transfer-details',
  templateUrl: './view-transfer-details.component.html',
  styleUrls: ['./view-transfer-details.component.scss'],
})
export class ViewTransferDetailsComponent implements OnInit {
  transferDetails: IViewTransferDetails = transferDetailDefaultValue;
  tableColumns = tableColumns;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viewTransferDetailsService: ViewTransferDetailsService,
    private loadingService: LoadingService,
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
      this.transferDetails = defineTransferDetailsData(value);
    });
  }

  onBack() {
    this.router.navigate([RouterPath.PaymentEngine, RouterPath.ManualChecks]);
  }
}
