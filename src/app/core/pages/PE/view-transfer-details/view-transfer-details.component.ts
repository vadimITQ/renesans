import { Component, OnInit } from '@angular/core';
import { TransferDetail } from './view-transfer-details.types';
import { transferDetailMock } from './view-transfer-details.mock';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { tableColumns, transferDetailDefaultValue } from './view-transfer-details.constants';
import { RouterPath } from '../../../../shared/enums/router.enums';

@Component({
  selector: 'app-view-transfer-details',
  templateUrl: './view-transfer-details.component.html',
  styleUrls: ['./view-transfer-details.component.scss'],
})
export class ViewTransferDetailsComponent implements OnInit {
  transferDetails: TransferDetail = transferDetailDefaultValue;
  tableColumns = tableColumns;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.transferDetails = transferDetailMock;
  }

  onBack() {
    this.router.navigate([RouterPath.PaymentEngine, RouterPath.ManualChecks]);
  }
}
