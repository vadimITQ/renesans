import { Component, OnDestroy, OnInit } from '@angular/core';
import { amlCheckTableColumns } from './aml-check-table.constants';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { PeNavigationService } from 'src/app/core/services/pe-navigation/pe-navigation.service';
import { PeRolesService } from '../../../../services/auth/pe-roles.service';
import { IColumn } from '../../../../../shared/types/table.types';
import { AmlCheckService } from '../../../../services/aml-check/aml-check.service';
import { IApplication } from '../../../../../shared/types/get-applications-list';
import { prepareAmlCheckData } from './aml-check-table.utils';

@Component({
  selector: 'app-aml-check-table',
  templateUrl: './aml-check-table.component.html',
  styleUrls: ['./aml-check-table.component.scss'],
})
export class AmlCheckTableComponent implements OnInit, OnDestroy {
  
  constructor(
    public amlCheckService: AmlCheckService,
    private toastService: ToastService,
    private peNavigationService: PeNavigationService,
    private peRolesService: PeRolesService,
  ) {}

  ngOnDestroy(): void {
    if (this.paymentResponseStateSubscription) {
      this.paymentResponseStateSubscription.unsubscribe();
    }
  }

  public tableColumns: IColumn[] = amlCheckTableColumns;
  public tableData: IApplication[] | null = null;
  public amlCheckResponse: IApplication[] | null | undefined = [];
  public skipFirst: boolean = true;
  private paymentResponseStateSubscription!: Subscription;

  linkClick(id: string) {
    this.peNavigationService.goToAmlDetails(id);
  }

  get hasAccessToViewTransferDetails() {
    return this.peRolesService.hasAccessToViewTransferDetails();
  }

  get hasAccessToAmlCheckDetails() {
    return true;
  }

  get hasAccessToSearchAgedOnly() {
    return this.peRolesService.hasAccessToSearchAgedOnly();
  }

  ngOnInit(): void {
    this.amlCheckResponse = this.amlCheckService.$tableData.value ?? [];
    if (this.amlCheckResponse.length > 0) {
      this.tableData = this.amlCheckResponse;
    }
    this.paymentResponseStateSubscription = this.amlCheckService.$tableData.subscribe(amlCheckResponse => {
      this.amlCheckResponse = amlCheckResponse;
      this.tableData = amlCheckResponse ? prepareAmlCheckData(amlCheckResponse) : null;
      if (this.skipFirst){
        this.skipFirst = false;
      }
      else if (amlCheckResponse !== undefined && !this.tableData?.length) {
        this.toastService.showWarnToast('Ничего не найдено, проверьте параметры запроса и интервалы дат');
      }
    });
  }
}
