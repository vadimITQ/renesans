
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { IAmlDetails, IAmlDetailsRequestedDocs } from "./aml-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { LoadingService } from "src/app/shared/services/loading.service";
import { FileUploadingModal, IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";
import { ToastService } from "src/app/shared/services/toast.service";
import {AmlDetailsService} from "../../../services/aml-check/aml-details.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { IMultiSelectData } from "src/app/shared/components/controls/pe-multiselect/pe-multiselect.component";
import { Any } from "src/app/shared/variables/pe-input-validations";

@Component({
    selector: "app-aml-details",
    templateUrl: "./aml-details.component.html",
    styleUrls: ["./aml-details.component.scss"]
})
export class AmlDetailsComponent implements OnInit, OnDestroy {

    constructor(
        private peRolesService: PeRolesService,
        private amlDetailsService: AmlDetailsService,
        private loading: LoadingService,
        private toast: ToastService,
        private aRoute: ActivatedRoute
    ) { }

    public subscribtions: { [key: string]: Subscription | null } = {
        getManualCheckMode: null
    };
    public paymentID: string = '';
    public readOnly: boolean = true;
    public amlDetailsData: IAmlDetails | "loading" = "loading";
    public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
    public labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };
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
        if (this.amlDetailsData !== "loading"){
            return this.amlDetailsData?.docsData?.length?.toString() ?? "0";
        }
        else{
            return "";
        }
    }

    get filesUploaded(): boolean {
        return !!this.uploadingModal.files.length;
    }

    ngOnDestroy(): void {
        if (!!this.subscribtions['routerParamsSubscribtion']){
            this.subscribtions['routerParamsSubscribtion'].unsubscribe();
        }
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.subscribtions['routerParamsSubscribtion'] = this.aRoute.params.subscribe(prms => {
            this.paymentID = prms['id'];
            this.amlDetailsService.getManualCheckMode(this.paymentID).subscribe(checkResponse => {
                this.readOnly = checkResponse.readOnly;
                if (!checkResponse.readOnly){
                    this.amlDetailsService.saveManualCheckMode(this.paymentID, '2');
                }
            });
            this.amlDetailsService.getAmlDetails().subscribe(
                response => {
                    this.amlDetailsData = response;
                    PaymentEngineHelper.scrollToTop();
                }
            );
        });
    }

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
        this.loading.showLoading();
        if (!this.filesUploaded){
            this.loading.hideLoading();
            this.clearUploadingModal();
            return;
        }
        this.amlDetailsRequestedDocs.filesData = this.uploadingModal.getData();
        setTimeout(() => {
            if (!!this.changeRef_AMLDetailsRequestedDocs){
                this.changeUploadingItem(this.uploadingModal.getData());
                this.toast.showSuccessToast("Документ был успешно изменён");
            }
            else if (this.amlDetailsData !== 'loading'){
                this.amlDetailsData.requestedDocsData.push(this.amlDetailsRequestedDocs);
            }
            this.loading.hideLoading();
            this.uploadingModal.hideModal();
            this.clearUploadingModal();
            console.log(this.amlDetailsData);
        }, 1500);
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
        if (this.amlDetailsData !== 'loading'){
            this.amlDetailsData.requestedDocsData = this.amlDetailsData.requestedDocsData.filter(_data => _data !== data);
        }
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
