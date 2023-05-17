
import { Component, OnInit } from "@angular/core";
import { PeRolesService } from "src/app/core/services/auth/pe-roles.service";
import { BankOpsDetailsService } from "src/app/core/services/bank-ops-check/bank-ops-details.service";
import { IBankOpsDetails } from "./bank-ops-details.types";
import { PaymentEngineHelper } from "src/app/shared/classes/pe-helper";
import { LoadingService } from "src/app/shared/services/loading.service";
import { FileUploadingModal, IPEUploadingData } from "src/app/shared/components/file-uploading-modal/file-uploading-modal.types";

@Component({
    selector: "app-bank-ops-details",
    templateUrl: "./bank-ops-details.component.html",
    styleUrls: ["./bank-ops-details.component.scss"]
})
export class BankOpsDetailsComponent implements OnInit {
    
    constructor(
        private peRolesService: PeRolesService,
        private bankOpsDetailsService: BankOpsDetailsService,
        private loading: LoadingService
    ) { }

    public bankOpsDetailsData: IBankOpsDetails | "loading" = "loading";
    public uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
    public uploadingData: IPEUploadingData[] = [];
    public labelsStyle: { [key: string]: string } = {
        "font-weight": "500"
    };

    public uploadingDataForEdit!: IPEUploadingData;

    get hasAccessToComponent(): boolean {
        return this.peRolesService.hasAccessToBankOpsDetails();
    }

    get docsDataCount(): string {
        if (this.bankOpsDetailsData !== "loading"){
            return this.bankOpsDetailsData?.docsData?.length?.toString() ?? "0";
        }
        else{
            return "";
        }
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.bankOpsDetailsService.getBankOpsDetails().subscribe(
            response => {
                this.bankOpsDetailsData = response;
                PaymentEngineHelper.scrollToTop();
            }
        );
    }

    addDocument() {
        this.uploadingModal.showModal();
    }

    getFiles(data: IPEUploadingData) {
        console.log(data);
    }

    onSave(data: IPEUploadingData){
        this.loading.showLoading();
        setTimeout(() => {
            if (this.uploadingModal.editMode){
                console.log(this.uploadingDataForEdit, data);
                this.uploadingDataForEdit.commentary = data.commentary;
                this.uploadingDataForEdit.docType = data.docType;
                this.uploadingDataForEdit.files = data.files;
                console.log(this.uploadingDataForEdit, data);
            }
            else{
                this.uploadingData.push(data);
            }
            this.loading.hideLoading();
            this.uploadingModal.hideModal({ clear: true });
        }, 1500);
    }

    onCancel(){
        this.uploadingModal.hideModal({ clear: true });
    }

    deleteUploadingItem(data: IPEUploadingData) {
        this.uploadingData = this.uploadingData.filter(_data => _data !== data);
    }

    editUploadingItem(data: IPEUploadingData) {
        this.uploadingDataForEdit = data;
        this.uploadingModal.data = {
            commentary: data.commentary,
            docType: data.docType,
            files: JSON.parse(JSON.stringify(data))
        };
        this.uploadingModal.showModal({
            editMode: true
        });
    }

}