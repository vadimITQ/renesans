import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tableColumns, transferDetailDefaultValue } from './view-transfer-details.constants';
import { ViewTransferDetailsService } from '../../../services/view-transfer-details/view-transfer-details.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { defineTransferDetailsData } from './view-transfer-details.utils';
import { IViewTransferDetails } from './view-transfer-details.types';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';

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
    private viewTransferDetailsService: ViewTransferDetailsService,
    private loadingService: LoadingService,
    private peNavigationService: PeNavigationService
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
    this.peNavigationService.goBack();
  }
}
