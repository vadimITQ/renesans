import { Component, OnDestroy, OnInit } from '@angular/core';
import { bankOpsCheckTableColumns } from './bank-ops-check-table.constants';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { DatePipe } from '@angular/common';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { PeRolesService } from '../../../../services/auth/pe-roles.service';
import { IColumn } from '../../../../../shared/types/table.types';
import { BankOpsCheckService } from '../../../../services/bank-ops-check/bank-ops-check.service';
import { IBankOpsCheck } from '../../../../services/bank-ops-check/types';

@Component({
  selector: 'app-bank-ops-check-table',
  templateUrl: './bank-ops-check-table.component.html',
  styleUrls: ['./bank-ops-check-table.component.scss'],
})
export class BankOpsCheckTableComponent implements OnInit, OnDestroy {
  constructor(
    public bankOpsCheckService: BankOpsCheckService,
    private toastService: ToastService,
    private datePipe: DatePipe,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService,
  ) {}

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscription) {
      this.paymentResponseStateSubscription.unsubscribe();
    }
  }

  public tableColumns: IColumn[] = bankOpsCheckTableColumns;
  public tableData: IBankOpsCheck[] | null = null;
  public bankOpsCheckResponse: IBankOpsCheck[] | null = [];
  private paymentResponseStateSubscription!: Subscription;

  linkClick(id: string) {
    // todo: implement me
    this.peNavigationService.goToBankOpsDetails(2);
  }

  get hasAccessToViewTransferDetails() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  get hasAccessToBankOpsCheckDetails() {
    return true;
  }

  ngOnInit(): void {
    this.bankOpsCheckResponse = this.bankOpsCheckService.$tableData.value ?? [];
    if (this.bankOpsCheckResponse.length > 0) {
      this.tableData = this.bankOpsCheckResponse;
    }
    this.paymentResponseStateSubscription = this.bankOpsCheckService.$tableData.subscribe(backOpsCheckResponse => {
      this.bankOpsCheckResponse = backOpsCheckResponse;
      this.tableData = backOpsCheckResponse;
    });
  }
}
