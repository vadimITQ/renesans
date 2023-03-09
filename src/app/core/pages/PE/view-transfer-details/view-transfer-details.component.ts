import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransferDetail } from './view-transfer-details.types';
import { transferDetailMock } from './view-transfer-details.mock';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { tableColumns, transferDetailDefaultValue } from './view-transfer-details.constants';
import { RouterPath } from '../../../../shared/enums/router.enums';
import { ViewTransferDetailsService } from '../../../services/view-transfer-details/view-transfer-details.service';
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-view-transfer-details',
  templateUrl: './view-transfer-details.component.html',
  styleUrls: ['./view-transfer-details.component.scss'],
})
export class ViewTransferDetailsComponent implements OnInit {
  transferDetails: TransferDetail = transferDetailDefaultValue;
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
    this.viewTransferDetailsService.getTransferDetails(currentTransferDetailsId).subscribe(console.log);
    // this.viewTransferDetailsService.$transferDetailsState.subscribe(value => {
    //   // this.transferDetails = value;
    //   console.log(value);
    // });
    this.loadingService.hideLoading();
  }

  onBack() {
    this.router.navigate([RouterPath.PaymentEngine, RouterPath.ManualChecks]);
  }
}
