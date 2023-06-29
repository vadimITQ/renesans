import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';
import { BankOpsDetailsService } from 'src/app/core/services/bank-ops-check/bank-ops-details.service';
import { IBankOpsDetails } from './bank-ops-details.types';
import { PaymentEngineHelper } from 'src/app/shared/classes/pe-helper';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { FileUploadingModal, IPEUploadingData } from 'src/app/shared/components/file-uploading-modal/file-uploading-modal.types';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-ops-details',
  templateUrl: './bank-ops-details.component.html',
  styleUrls: ['./bank-ops-details.component.scss'],
})
export class BankOpsDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private peRolesService: PeRolesService,
    private bankOpsDetailsService: BankOpsDetailsService,
    private loading: LoadingService,
    private toast: ToastService,
    private aRoute: ActivatedRoute
  ) {}

  public subscribtions: { [key: string]: Subscription | null } = {
    routerParamsSubscribtion: null
  };
  public paymentID: string = '';
  public readOnly: boolean = true;
  public bankOpsDetailsData: IBankOpsDetails | 'loading' = 'loading';
  public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
  public uploadingData: IPEUploadingData[] = [];
  public labelsStyle: { [key: string]: string } = {
    'font-weight': '500',
  };

  public uploadingDataForChanges: IPEUploadingData | null = null;

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToBankOpsDetails();
  }

  get docsDataCount(): string {
    if (this.bankOpsDetailsData !== 'loading') {
      return this.bankOpsDetailsData?.docsData?.length?.toString() ?? '0';
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (!!this.subscribtions['routerParamsSubscribtion']){
      this.subscribtions['routerParamsSubscribtion'].unsubscribe();
    }
  }
  
  loadData() {
    this.subscribtions['routerParamsSubscribtion'] = this.aRoute.params.subscribe(prms => {
      this.paymentID = prms['id'];
      this.bankOpsDetailsService.getManualCheckMode(this.paymentID).subscribe(manualCheckModeResponse => {
        this.readOnly = manualCheckModeResponse.readOnly;
        if (!manualCheckModeResponse.readOnly){
          this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '2');
        }
      });
      this.bankOpsDetailsService.getBankOpsDetails().subscribe(response => {
        this.bankOpsDetailsData = response;
        PaymentEngineHelper.scrollToTop();
      });
    });
  }

  approve() {
    this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '3');
  }

  cancel() {
    this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '5');
  }

  sendDocs() {
    this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '4');
    this.uploadingData
  }

  requestSWIFT() {
    this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '6');
    this.uploadingData
  }

  addDocument() {
    this.uploadingModal.showModal();
  }

  onSave(data: IPEUploadingData) {
    this.loading.showLoading();
    if (!data.files.length) {
      this.loading.hideLoading();
      this.clearUploadingModal();
      return;
    }
    setTimeout(() => {
      if (!!this.uploadingDataForChanges) {
        this.changeUploadingItem(data);
        this.toast.showSuccessToast('Документ был успешно изменён');
        console.log(this.uploadingDataForChanges);
      } else {
        this.uploadingData.push(data);
        console.log(this.uploadingData);
      }
      this.loading.hideLoading();
      this.clearUploadingModal();
    }, 1500);
  }

  changeUploadingItem(data: IPEUploadingData) {
    if (!this.uploadingDataForChanges) {
      return;
    }
    const docTypeIsChanged = this.uploadingDataForChanges.docType !== data.docType;
    this.uploadingDataForChanges.commentary = data.commentary;
    this.uploadingDataForChanges.docType = data.docType;
    if (docTypeIsChanged || !!data.files.length) {
      this.uploadingDataForChanges.files = data.files;
    }
  }

  onCancel() {
    this.clearUploadingModal();
  }

  deleteUploadingItem(data: IPEUploadingData) {
    this.uploadingData = this.uploadingData.filter(_data => _data !== data);
  }

  editUploadingItem(data: IPEUploadingData) {
    this.uploadingDataForChanges = data;
    this.uploadingModal.setData(data);
    this.uploadingModal.showModal();
  }

  clearUploadingModal() {
    this.uploadingDataForChanges = null;
    this.uploadingModal.hideModal();
    this.uploadingModal.clear();
  }
}
