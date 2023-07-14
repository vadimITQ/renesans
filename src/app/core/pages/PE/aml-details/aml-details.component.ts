
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { IAmlDetails, IAmlDetailsForm, IAmlDetailsRequestedDocs } from "./aml-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FileUploadingModal, IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";
import { ToastService } from "src/app/shared/services/toast.service";
import { AmlDetailsService } from "../../../services/aml-check/aml-details.service";
import { AmlDetailsUtils } from "./aml-details.utils";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";
import { Any } from "src/app/shared/variables/pe-input-validations";
import { LoadingService } from "src/app/shared/services/loading.service";
import { PEReactiveHelper } from "src/app/shared/components/reactive-controls/utils";
import { PeConfig } from "src/app/shared/config/config";
import { PeNavigationService } from "src/app/core/services/pe-navigation/pe-navigation.service";
import { executeRequestedDocsCommentary } from "src/app/core/services/payment-order-w/utils";
import { DatePickerHelper } from "src/app/shared/components/controls/date-picker/date-picker-helper";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { IRequestedDocument } from "src/app/shared/types/get-application-details";

@Component({
    selector: "app-aml-details",
    templateUrl: "./aml-details.component.html",
    styleUrls: ["./aml-details.component.scss"]
})
export class AmlDetailsComponent implements OnInit, OnDestroy {

    constructor(
        private peRolesService: PeRolesService,
        private amlDetailsService: AmlDetailsService,
        private loadingService: LoadingService,
        private toast: ToastService,
        private utils: AmlDetailsUtils,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService,
        private peNavigation: PeNavigationService,
        private authService: AuthService
    ) { }

    public detailsForm: FormGroup<IAmlDetailsForm> = this.utils.createEmptyForm();
    public paymentID: string = '';
    public readOnly: boolean = true;
    public startDate: Date | null = null;
    public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
    public labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };
    public loading: boolean = false;
    public readonly FILES_COMMENTARY_REGEXPR = Any;
    public subscriptions: { [key: string]: Subscription | null } = {
        getManualCheckMode: null
    };

    public amlDetailsRequestedDocs: IAmlDetailsRequestedDocs = {
        commentaryAML: '',
        commentaryBankOps: '',
        filesData: {
            docType: {} as IMultiSelectData,
            files: []
        }
    };
    public changeRef_docRow: IRequestedDocument | null = null;
    public changeRef_AMLDetailsRequestedDocs: IAmlDetailsRequestedDocs | null = null;

    get hasAccessToComponent(): boolean {
        return this.peRolesService.hasAccessToAmlDetails();
    }

    get docsDataCount(): string {
        if (!!this.detailsForm.controls.responsedDocuments){
            return this.detailsForm.controls.responsedDocuments.length?.toString() ?? "0";
        }
        else{
            return '';
        }
    }

    get filesUploaded(): boolean {
        return !!this.uploadingModal.files.length;
    }

    get applicationExpired(): boolean { 
      if (!!this.startDate){
        const diff = new Date().getTime() - this.startDate.getTime();
        return (diff / 1000) > PeConfig.manualAMLCheckTimeOut;
      }
      else {
        return false;
      }
    }

    public editFilesDisabled(doc: IRequestedDocument | null): boolean {
      return this.readOnly || !!doc?.docID;
    }

    public deleteFilesDisabled(doc: IRequestedDocument | null): boolean {
      return this.readOnly || !!doc?.docID;
    }
    
    ngOnDestroy(): void {
        if (!!this.subscriptions['routerParamsSubscribtion']){
            this.subscriptions['routerParamsSubscribtion'].unsubscribe();
        }
    }

    ngOnInit(): void {

      const amlDetailsId = this.activatedRoute.snapshot.paramMap.get('id');

      this.detailsForm.disable();

      if (!amlDetailsId) {
        return;
      }
      this.loading = true;
      this.amlDetailsService.getAmlDetails(amlDetailsId).subscribe(application => {

        if (!application) {
          this.loading = false;
          return;
        }

        executeRequestedDocsCommentary(application);
        this.paymentID = application.payment.paymentID;
        this.loading = false;

        this.amlDetailsService.getManualCheckMode(this.paymentID).subscribe(manualCheckModeResponse => {
          manualCheckModeResponse.readOnly = false;
          this.readOnly = manualCheckModeResponse.readOnly;
          if (!manualCheckModeResponse.readOnly) {
            this.detailsForm.enable();
            this.startDate = new Date();
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '2').subscribe();
          }
        });

        this.detailsForm.patchValue(PEReactiveHelper.extractValues(this.utils.prepareAmlDetailsForm(application)));
        PaymentEngineHelper.scrollToTop();

      });
    }

    back() {
        if (!this.readOnly){
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '1').subscribe();
        }
    }

    approve() {
        if (this.readOnly){return};
        if (this.applicationExpired){
            this.toastService.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
        }
        else {
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '3').subscribe(() => this.peNavigation.goBack());
        }
    }

    cancel() {
        if (this.readOnly){return};
        if (this.applicationExpired){
            this.toastService.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
        }
        else {
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '5').subscribe(() => this.peNavigation.goBack());
        }
    }

    sendDocs() {
        if (this.readOnly){return};
        if (this.applicationExpired){
            this.toastService.showWarnToast('Время, отведенное на обработку заявки, истекло. Откройте заявку на рассмотрение повторно');
        }
        else { 
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '4').subscribe(() => this.peNavigation.goBack());   
        }
    }

    addDocument() {
        if (this.readOnly){
            return;
        }
        this.uploadingModal.showModal();
    }

    onSave(){
      this.loadingService.showLoading();
        if (!this.filesUploaded){
            this.loadingService.hideLoading();
            this.clearUploadingModal();
            return;
        }
        this.amlDetailsRequestedDocs.filesData = this.uploadingModal.getData();
        setTimeout(() => {
            if (!!this.changeRef_AMLDetailsRequestedDocs){
                this.changeUploadingItem(this.uploadingModal.getData());
                this.toast.showSuccessToast("Документ был успешно изменён");
            }
            else {
                this.detailsForm.controls.requestedDocuments.push(new FormControl<IRequestedDocument | null>({
                  docID: '',
                  department: 'BANK_OPS',
                  docType: `${this.amlDetailsRequestedDocs.filesData.docType.label}: \n${this.amlDetailsRequestedDocs.filesData.files.map(file => (file.file?.name ?? '') + '\n')}`,
                  requestTime: DatePickerHelper.convertToLocaleStringWithTimezone(new Date().toISOString()) ?? '',
                  userLogin: this.authService.user?.connectionName ?? '',
                  docs: {
                    commentaryAML: this.amlDetailsRequestedDocs.commentaryAML,
                    commentaryBankOps: this.amlDetailsRequestedDocs.commentaryBankOps,
                    filesData: this.amlDetailsRequestedDocs.filesData
                  }
                }));
            }
            this.loadingService.hideLoading();
            this.uploadingModal.hideModal();
            this.clearUploadingModal();
        }, 500);
    }

    changeUploadingItem(data: IPEUploadingData) {
      if (!this.changeRef_AMLDetailsRequestedDocs){
          return;
      }
      const docTypeIsChanged = this.changeRef_AMLDetailsRequestedDocs.filesData.docType !== data.docType;
      this.changeRef_AMLDetailsRequestedDocs.commentaryAML = this.amlDetailsRequestedDocs.commentaryAML;
      this.changeRef_AMLDetailsRequestedDocs.commentaryBankOps = this.amlDetailsRequestedDocs.commentaryBankOps;
      this.changeRef_AMLDetailsRequestedDocs.filesData.docType = data.docType;
      if (docTypeIsChanged || !!data.files.length){
          this.changeRef_AMLDetailsRequestedDocs.filesData.files = data.files;
      }
      if (!!this.changeRef_docRow){
        this.changeRef_docRow.docType = `${this.amlDetailsRequestedDocs.filesData.docType.label}: \n${this.amlDetailsRequestedDocs.filesData.files.map(file => (file.file?.name ?? '') + '\n')}` ?? '';
      }
    }

    onCancel(){
        this.uploadingModal.hideModal();
        this.clearUploadingModal();
    }

    deleteUploadingItem(data: IRequestedDocument | null, index: number) {
      if (this.deleteFilesDisabled(data)){
        return;
      }
      this.detailsForm.controls.requestedDocuments.removeAt(index);
    }

    editUploadingItem(row: IRequestedDocument | null) {
        if (this.editFilesDisabled(row)){
          return;
        }
        if (!!row?.docs){
          this.changeRef_docRow = row;
          this.changeRef_AMLDetailsRequestedDocs = row.docs;
          this.amlDetailsRequestedDocs = {
            commentaryAML: row.docs.commentaryAML,
            commentaryBankOps: row.docs.commentaryBankOps,
            filesData: row.docs.filesData
          };
          this.uploadingModal.setData(row.docs.filesData);
          this.uploadingModal.showModal();  
        }
      }

    clearUploadingModal() {
        this.uploadingModal.clear();
        this.amlDetailsRequestedDocs = {
            commentaryAML: '',
            commentaryBankOps: '',
            filesData: {
                docType: {} as IMultiSelectData,
                files: []
            }
        };
        this.changeRef_AMLDetailsRequestedDocs = null;
        this.changeRef_docRow = null;
    }

}
