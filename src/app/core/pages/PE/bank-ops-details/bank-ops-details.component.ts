import { Component, OnDestroy, OnInit } from '@angular/core';
import { PeRolesService } from 'src/app/core/services/auth/pe-roles.service';
import { BankOpsDetailsService } from 'src/app/core/services/bank-ops-check/bank-ops-details.service';
import { IBankOpsDetails, IBankOpsDetailsRequestedDocs } from './bank-ops-details.types';
import { PaymentEngineHelper } from 'src/app/shared/classes/pe-helper';
import { FileUploadingModal, IPEUploadingData } from 'src/app/shared/components/file-uploading-modal/file-uploading-modal.types';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { prepareBankOpsDetails } from './bank-ops-details.utils';
import { Any, commentaryExpr } from 'src/app/shared/variables/pe-input-validations';
import { IMultiSelectData } from 'src/app/shared/components/controls/pe-multiselect/pe-multiselect.component';

@Component({
  selector: 'app-bank-ops-details',
  templateUrl: './bank-ops-details.component.html',
  styleUrls: ['./bank-ops-details.component.scss'],
})
export class BankOpsDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private peRolesService: PeRolesService,
    private bankOpsDetailsService: BankOpsDetailsService,
    private toast: ToastService,
  ) {}

  public subscribtions: { [key: string]: Subscription | null } = {
    routerParamsSubscribtion: null,
  };
  public readonly FILES_COMMENTARY_REGEXPR = Any;
  public paymentID: string = '';
  public readOnly: boolean = true;
  public bankOpsDetails: IBankOpsDetails = prepareBankOpsDetails(null);
  public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
  public labelsStyle: { [key: string]: string } = {
    'font-weight': '500',
  };
  public loading: boolean = false;
  public commentary: string = '';
  public readonly COMMENTARY_EXPR = commentaryExpr;

  public requestedDocsData:IBankOpsDetailsRequestedDocs[]=[]
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
    if (this.bankOpsDetails) {
      return this.bankOpsDetails?.responsedDocuments?.length?.toString() ?? '0';
    } else {
      return '';
    }
  }

  get filesUploaded(): boolean {
    return !!this.uploadingModal.files.length;
  }

  ngOnInit(): void {
    const bankOpsDetailsId = this.activatedRoute.snapshot.paramMap.get('id');

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
          this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '2');
        }
      });
      this.bankOpsDetails = prepareBankOpsDetails(value);
      PaymentEngineHelper.scrollToTop();
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
  }

  requestSWIFT() {
    this.bankOpsDetailsService.saveManualCheckMode(this.paymentID, '6');
  }

  ngOnDestroy(): void {
    if (!!this.subscribtions['routerParamsSubscribtion']) {
      this.subscribtions['routerParamsSubscribtion'].unsubscribe();
    }
  }
  addDocument() {
    this.uploadingModal.showModal();
  }

  onSave() {
    this.loading= true
    if (!this.filesUploaded) {
      this.loading = false
      this.clearUploadingModal();
      return;
    }
    this.bankOpsDetailsRequestedDocs.filesData = this.uploadingModal.getData();
    setTimeout(() => {
      if (!!this.changeRef_BankOpsDetailsRequestedDocs) {
        this.changeUploadingItem(this.uploadingModal.getData());
        this.toast.showSuccessToast('Документ был успешно изменён');
      } else if (this.bankOpsDetails) {
        this.requestedDocsData.push(this.bankOpsDetailsRequestedDocs);
      }
      this.loading = false
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
