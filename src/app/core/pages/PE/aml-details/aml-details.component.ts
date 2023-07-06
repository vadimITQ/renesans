
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { IAmlDetails, IAmlDetailsRequestedDocs } from "./aml-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { FileUploadingModal, IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";
import { ToastService } from "src/app/shared/services/toast.service";
import {AmlDetailsService} from "../../../services/aml-check/aml-details.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import {prepareAmlDetails} from "./aml-details.utils";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";
import { Any } from "src/app/shared/variables/pe-input-validations";
import { LoadingService } from "src/app/shared/services/loading.service";

@Component({
    selector: "app-aml-details",
    templateUrl: "./aml-details.component.html",
    styleUrls: ["./aml-details.component.scss"]
})
export class AmlDetailsComponent implements OnInit, OnDestroy {

    constructor(
        private peRolesService: PeRolesService,
        private amlDetailsService: AmlDetailsService,
        private toast: ToastService,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService
    ) { }

    public subscriptions: { [key: string]: Subscription | null } = {
        getManualCheckMode: null
    };
    public paymentID: string = '';
    public readOnly: boolean = true;
    public amlDetails: IAmlDetails =  prepareAmlDetails(null);
    public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
    public labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };
  public loading: boolean = false;

  public requestedDocsData:IAmlDetailsRequestedDocs[] =[]
    public uploadingDataForChanges: IPEUploadingData | null = null;
    public amlDetailsRequestedDocs: IAmlDetailsRequestedDocs = {
        commentaryAML: '',
        commentaryBankOps: '',
        filesData: {
            docType: {} as IMultiSelectData,
            files: []
        }
    };
    public readonly FILES_COMMENTARY_REGEXPR = Any;
    public changeRef_AMLDetailsRequestedDocs: IAmlDetailsRequestedDocs | null = null;

    get hasAccessToComponent(): boolean {
        return this.peRolesService.hasAccessToAmlDetails();
    }

    get docsDataCount(): string {
        if (this.amlDetails){
            return this.amlDetails?.responsedDocuments?.length?.toString() ?? "0";
        }
        else{
            return "";
        }
    }

    get filesUploaded(): boolean {
        return !!this.uploadingModal.files.length;
    }

    ngOnDestroy(): void {
        if (!!this.subscriptions['routerParamsSubscribtion']){
            this.subscriptions['routerParamsSubscribtion'].unsubscribe();
        }
    }

    ngOnInit(): void {

      const amlDetailsId = this.activatedRoute.snapshot.paramMap.get('id');

      if (!amlDetailsId) {
        return;
      }
      this.loading = true;
      this.amlDetailsService.getAmlDetails(amlDetailsId).subscribe(value => {
        if (!value) {
          this.loading = false;

          return;
        }
        this.paymentID = value.payment.paymentID;
        this.loading = false;

        this.amlDetailsService.getManualCheckMode(this.paymentID).subscribe(manualCheckModeResponse => {
          this.readOnly = manualCheckModeResponse.readOnly;
          if (!manualCheckModeResponse.readOnly) {
            this.amlDetailsService.saveManualCheckMode(this.paymentID, '2');
          }
        });
        this.amlDetails = prepareAmlDetails(value);
        PaymentEngineHelper.scrollToTop();
      });    }

    // loadData() {
    //     this.subscribtions['routerParamsSubscribtion'] = this.activatedRoute.params.subscribe(prms => {
    //         this.paymentID = prms['id'];
    //         this.amlDetailsService.getManualCheckMode(this.paymentID).subscribe(checkResponse => {
    //             this.readOnly = checkResponse.readOnly;
    //             if (!checkResponse.readOnly){
    //                 this.amlDetailsService.saveManualCheckMode(this.paymentID, '2');
    //             }
    //         });
    //         this.amlDetailsService.getAmlDetails().subscribe(
    //             response => {
    //                 this.amlDetails = response;
    //                 PaymentEngineHelper.scrollToTop();
    //             }
    //         );
    //     });
    // }

    back() {
        this.amlDetailsService.saveManualCheckMode(this.paymentID, '1');
    }

    approve() {
        this.amlDetailsService.saveManualCheckMode(this.paymentID, '3');
    }

    cancel() {
        this.amlDetailsService.saveManualCheckMode(this.paymentID, '5');
    }

    sendDocs() {
        this.amlDetailsService.saveManualCheckMode(this.paymentID, '4');
    }

    addDocument() {
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
                this.requestedDocsData.push(this.amlDetailsRequestedDocs);
            }
            this.loadingService.hideLoading();
            this.uploadingModal.hideModal();
            this.clearUploadingModal();
            console.log(this.amlDetails);
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
    }

    onCancel(){
        this.uploadingModal.hideModal();
        this.clearUploadingModal();
    }

    deleteUploadingItem(data: IAmlDetailsRequestedDocs) {
            this.requestedDocsData = this.requestedDocsData.filter(value => value !== data);
    }

    editUploadingItem(row: IAmlDetailsRequestedDocs) {
        this.changeRef_AMLDetailsRequestedDocs = row;
        this.amlDetailsRequestedDocs = {
            commentaryAML: row.commentaryAML,
            commentaryBankOps: row.commentaryBankOps,
            filesData: row.filesData
        }
        this.uploadingModal.setData(row.filesData);
        this.uploadingModal.showModal();
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
    }

}
