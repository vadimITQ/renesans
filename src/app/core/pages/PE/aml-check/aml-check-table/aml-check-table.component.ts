import { Component, OnDestroy, OnInit } from '@angular/core';
import { amlCheckTableColumns } from './aml-check-table.constants';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { DatePipe } from '@angular/common';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { PeRolesService } from '../../../../services/auth/pe-roles.service';
import { IColumn } from '../../../../../shared/types/table.types';
import {AmlCheckService} from "../../../../services/aml-check/aml-check.service";
import {IAmlCheck} from "../../../../services/aml-check/types";

@Component({
  selector: 'app-aml-check-table',
  templateUrl: './aml-check-table.component.html',
  styleUrls: ['./aml-check-table.component.scss'],
})
export class AmlCheckTableComponent implements OnInit, OnDestroy {
  constructor(
    public amlCheckService: AmlCheckService,
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

  public tableColumns: IColumn[] = amlCheckTableColumns;
  public tableData: IAmlCheck[] | null = null;
  public amlCheckResponse: IAmlCheck[] | null = [];
  private paymentResponseStateSubscription!: Subscription;

  linkClick(id: string) {
    // todo: implement me
    // this.peNavigationService.goToAmlDetails(2);
  }

  get hasAccessToViewTransferDetails() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  get hasAccessToAmlCheckDetails() {
    return true;
  }


  get hasAccessToSearchOnlyExpired() {
    return this.peRolesService.hasAccessToSearchOnlyExpired();
  }

  ngOnInit(): void {
    this.amlCheckResponse = this.amlCheckService.$tableData.value ?? [];
    if (this.amlCheckResponse.length > 0) {
      this.tableData = this.amlCheckResponse;
    }
    this.paymentResponseStateSubscription = this.amlCheckService.$tableData.subscribe(amlCheckResponse => {
      this.amlCheckResponse = amlCheckResponse;
      this.tableData = amlCheckResponse;
    });
  }
}
