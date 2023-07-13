
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { BankOpsDetailsService } from "src/app/core/services/bank-ops-check/bank-ops-details.service";
import { IBankOpsFormGroup } from "./bank-ops-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { IBankOpsDetailsRequestedDocs } from './bank-ops-details.types';
import { FileUploadingModal, IPEUploadingData } from 'src/app/shared/components/file-uploading-modal/file-uploading-modal.types';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { prepareBankOpsDetails } from './bank-ops-details.utils';
import { Any, commentaryExpr } from 'src/app/shared/variables/pe-input-validations';
import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { IAutoCheck, IManualCheck, IRequestedDocument, IResponsedDocument } from "src/app/shared/types/get-application-details";
import { PeConfig } from "src/app/shared/config/config";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";

@Component({
  selector: 'app-bank-ops-details',
  templateUrl: './bank-ops-details.component.html',
  styleUrls: ['./bank-ops-details.component.scss'],
})
export class BankOpsDetailsComponent implements OnInit, OnDestroy {
    
  constructor(
      private peRolesService: PeRolesService,
      private bankOpsDetailsService: BankOpsDetailsService,
      private toast: ToastService,
      private fb: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private loadingService: LoadingService,
      private peNavigation: PeNavigationService
  ) { }
  
  public bankOpsGroup: FormGroup<IBankOpsFormGroup> = this.createEmptyForm();
  public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();

  public subscribtions: { [key: string]: Subscription | null } = {
    routerParamsSubscribtion: null,
  };
  public readonly FILES_COMMENTARY_REGEXPR = Any;
  public paymentID: string = '';
  public readOnly: boolean = true;
  public labelsStyle: { [key: string]: string } = {
      "font-weight": "500"
  };
  public loading: boolean = false;
  public commentary: string = '';
  public startDate: Date | null = null;
  public readonly COMMENTARY_EXPR = commentaryExpr;

  public requestedDocsData:IBankOpsDetailsRequestedDocs[] = [];
  public bankOpsDetailsRequestedDocs: IBankOpsDetailsRequestedDocs = {
      commentaryAML: '',
      commentaryBankOps: '',
      filesData: {
          docType: {} as IMultiSelectData,
          files: []
      }
  };
  public changeRef_BankOpsDetailsRequestedDocs: IBankOpsDetailsRequestedDocs | null = null;

  get hasAccessToComponent(): boolean {
    return this.peRolesService.hasAccessToBankOpsDetails();
  }

  get docsDataCount(): string {
    if (!!this.bankOpsGroup.controls.requestedDocuments.value) {
      return this.bankOpsGroup.controls.requestedDocuments.value.length?.toString() ?? '0';
    } else {
      return '';
    }
  }

  get filesUploaded(): boolean {
    return !!this.uploadingModal.files.length;
  }

  get deleteFilesDisabled(): boolean {
    return this.readOnly;
  }

  get editFilesDisabled(): boolean {
    return this.readOnly;
  }

  get showDocs(): boolean {
    return true;
    // return EXT_SWIFT
  }

  get applicationExpired(): boolean { 
    if (!!this.startDate){
      const diff = new Date().getTime() - this.startDate.getTime();
      return (diff / 1000) > PeConfig.manualBankOpsCheckTimeOut;
    }
    else {
      return false;
    }
  }

  loadData() {

    const bankOpsDetailsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.bankOpsGroup.disable();

    if (!bankOpsDetailsId) {
      return;
    }
    this.loading = true;
    this.bankOpsDetailsService.getBankOpsDetails(bankOpsDetailsId).subscribe(value => {

      if (!value) {
        this.loading = false;
        return;
      }

      this.paymentID = value.payment.paymentID;
      this.loading = false;

      this.bankOpsDetailsService.getManualCheckMode(this.paymentID).subscribe(manualCheckModeResponse => {
        this.readOnly = manualCheckModeResponse.readOnly;
        if (!manualCheckModeResponse.readOnly) {
          this.bankOpsGroup.enable();
          this.startDate = new Date();
          this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '2').subscribe();
        }
      });
      
      this.bankOpsGroup.patchValue({...prepareBankOpsDetails(value), commentary: null});
      PaymentEngineHelper.scrollToTop();

    });

  }

  createEmptyForm(): FormGroup<IBankOpsFormGroup> {
      return this.fb.group<IBankOpsFormGroup>({
        paymentID: new FormControl(null),
        pmtCreationTime: new FormControl(null),
        payerName: new FormControl(null),
        payerAccount: new FormControl(null),
        payeeName: new FormControl(null),
        payeeAccount: new FormControl(null),
        payeeINN: new FormControl(null),
        payeeBIC: new FormControl(null),
        paymentPurpose: new FormControl(null),
        amount: new FormControl(null),
        autoChecks: this.fb.array<IAutoCheck>([]),
        manualChecks: this.fb.array<IManualCheck>([]),
        requestedDocuments: this.fb.array<IRequestedDocument>([]),
        responsedDocuments: this.fb.array<IResponsedDocument>([]),
        commentary: new FormControl(null),
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  back() {
    if (!this.readOnly) {
      
    }
  }

  approve() {
    if (this.readOnly){return};
    if (this.applicationExpired){
        this.toast.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '3').subscribe(() => this.peNavigation.goBack());
    }
  }

  cancel() {
    if (this.readOnly){return};
    if (this.applicationExpired){
        this.toast.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '5').subscribe(() => this.peNavigation.goBack());
    }
  }

  sendDocs() {
    if (this.readOnly){return};
    if (this.applicationExpired){
        this.toast.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '4').subscribe(() => this.peNavigation.goBack());
    }
  }

  requestSWIFT() {
    if (this.readOnly){return};
    if (this.applicationExpired){
        this.toast.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
    }
    else {
      this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '6').subscribe(() => this.peNavigation.goBack());
    }
  }

  ngOnDestroy(): void {
    if (!!this.subscribtions['routerParamsSubscribtion']) {
      this.subscribtions['routerParamsSubscribtion'].unsubscribe();
    }
  }
  addDocument() {
    if (this.readOnly){return;}
    this.uploadingModal.showModal();
  }

  onSave() {
    this.loadingService.showLoading();
    if (!this.filesUploaded) {
      this.loadingService.hideLoading();
      this.clearUploadingModal();
      return;
    }
    this.bankOpsDetailsRequestedDocs.filesData = this.uploadingModal.getData();
    setTimeout(() => {
      if (!!this.changeRef_BankOpsDetailsRequestedDocs) {
        this.changeUploadingItem(this.uploadingModal.getData());
        this.toast.showSuccessToast('Документ был успешно изменён');
      } {
        this.requestedDocsData.push(this.bankOpsDetailsRequestedDocs);
      }
      this.loadingService.hideLoading();
      this.clearUploadingModal();
    }, 1500);
  }

  changeUploadingItem(data: IPEUploadingData) {
    if (!this.changeRef_BankOpsDetailsRequestedDocs) {
      return;
    }
    const docTypeIsChanged = this.changeRef_BankOpsDetailsRequestedDocs.filesData.docType !== data.docType;
    this.changeRef_BankOpsDetailsRequestedDocs.commentaryAML = this.bankOpsDetailsRequestedDocs.commentaryAML;
    this.changeRef_BankOpsDetailsRequestedDocs.commentaryBankOps = this.bankOpsDetailsRequestedDocs.commentaryBankOps;
    this.changeRef_BankOpsDetailsRequestedDocs.filesData.docType = data.docType;
    if (docTypeIsChanged || !!data.files.length) {
      this.changeRef_BankOpsDetailsRequestedDocs.filesData.files = data.files;
    }
  }

  onCancel() {
    this.uploadingModal.hideModal();
    this.clearUploadingModal();
  }

  deleteUploadingItem(data: IBankOpsDetailsRequestedDocs) {
      this.requestedDocsData = this.requestedDocsData.filter(value => value !== data);

  }

  editUploadingItem(row: IBankOpsDetailsRequestedDocs) {
    this.changeRef_BankOpsDetailsRequestedDocs = row;
    this.bankOpsDetailsRequestedDocs = {
      commentaryAML: row.commentaryAML,
      commentaryBankOps: row.commentaryBankOps,
      filesData: row.filesData
    };
    this.uploadingModal.setData(row.filesData);
    this.uploadingModal.showModal();
  }

  clearUploadingModal() {
    this.uploadingModal.clear();
    this.bankOpsDetailsRequestedDocs = {
        commentaryAML: '',
        commentaryBankOps: '',
        filesData: {
            docType: {} as IMultiSelectData,
            files: []
        }
    };
    this.changeRef_BankOpsDetailsRequestedDocs = null;
  }
  
}
