
import { Component, OnDestroy, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { IAmlDetails } from "./aml-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { LoadingService } from "src/app/shared/services/loading.service";
import { FileUploadingModal, IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";
import { ToastService } from "src/app/shared/services/toast.service";
import {AmlDetailsService} from "../../../services/aml-check/aml-details.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";

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
    public uploadingData: IPEUploadingData[] = [];
    public labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };

    public uploadingDataForChanges: IPEUploadingData | null = null;

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
        this.uploadingData
    }

    addDocument() {
        this.uploadingModal.showModal();
    }

    onSave(data: IPEUploadingData){
        this.loading.showLoading();
        if (!data.files.length){
            this.loading.hideLoading();
            this.clearUploadingModal();
            return;
        }
        setTimeout(() => {
            if (!!this.uploadingDataForChanges){
                this.changeUploadingItem(data);
                this.toast.showSuccessToast("Документ был успешно изменён");
                console.log(this.uploadingDataForChanges);
            }
            else{
                this.uploadingData.push(data);
                console.log(this.uploadingData);
            }
            this.loading.hideLoading();
            this.clearUploadingModal();
        }, 1500);
    }

    changeUploadingItem(data: IPEUploadingData) {
        if (!this.uploadingDataForChanges){
            return;
        }
        const docTypeIsChanged = this.uploadingDataForChanges.docType !== data.docType;
        this.uploadingDataForChanges.commentary = data.commentary;
        this.uploadingDataForChanges.docType = data.docType;
        if (docTypeIsChanged || !!data.files.length){
            this.uploadingDataForChanges.files = data.files;
        }
    }

    onCancel(){
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
