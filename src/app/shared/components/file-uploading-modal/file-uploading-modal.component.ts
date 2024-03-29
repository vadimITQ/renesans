
import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { MultiselectDataSets } from "../../enums/datasets.enums";
import { IMultiSelectData } from "../controls/pe-multiselect/pe-multiselect.component";
import { ToastService } from "../../services/toast.service";
import { LoadingService } from "../../services/loading.service";
import { FileHelper } from "../../classes/file-helper";
import { FileUploadingModal, IPEUploadingData } from "./file-uploading-modal.types";
import { DEFAULT_MODAL_STYLE } from "./file-uploading-modal.variables";

@Component({
    selector: "pe-file-uploading-modal",
    templateUrl: "./file-uploading-modal.component.html",
    styleUrls: ["./file-uploading-modal.component.scss"]
})
export class FileUploadingModalComponent {

    constructor(
        private toast: ToastService,
        private loading: LoadingService
    ){}

    @ViewChild("fileForm", { static: true }) fileForm!: ElementRef<HTMLInputElement>;

    @Input() uploadingModal: FileUploadingModal = FileUploadingModal.createDefaultModal();
    @Input() style: { [key: string]: string } = DEFAULT_MODAL_STYLE;
    @Input() showCancelModal: boolean = true;
    @Input() showCancelButton: boolean = true;
    @Input() showSaveButton: boolean = true;
    @Input() multipleFiles: boolean = false;

    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSave: EventEmitter<IPEUploadingData> = new EventEmitter<IPEUploadingData>();
    @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() getUploadigData: EventEmitter<IPEUploadingData> = new EventEmitter<IPEUploadingData>();

    public commentaryRegExpr = new RegExp("");
    public multiselectDataSetsEnum = MultiselectDataSets;
    private _show: boolean = false;

    @Input() get show(): boolean {
        return this._show;
    }

    set show(showValue: boolean) {
        this._show = showValue;
        this.showChange.emit(showValue);
    }

    get filesUploaded(): boolean {
        return !!this.uploadingModal.data.files.length;
    }

    addFile(event: IMultiSelectData) {
        setTimeout(() => {
            this.uploadingModal.data.files = [];
            this.fileForm.nativeElement.accept = event.value;
            this.fileForm.nativeElement.click();
        });
    }

    cancelChanges() {
        this.onCancel.emit();
    }

    saveChanges() {
        if (this.filesUploaded){
            this.onSave.emit(this.uploadingModal.data);
        }
    }

    fileUpload(e: Event): void {
        const htmlInputElement = e.target as HTMLInputElement;
        if (!htmlInputElement.files?.length) {
            return;
        }

        if (htmlInputElement.files.length > 0) {
            this.loading.attach(
                FileHelper
                .readPEUploadingFileList(htmlInputElement.files)
                .then(uploadingFileList => {
                    uploadingFileList.forEach(file => {
                        this.toast.showSuccessToast(`Добавлен файл ${ file.file?.name ?? '' }`);
                    });
                    this.uploadingModal.data.files = uploadingFileList;
                    this.getUploadigData.emit(this.uploadingModal.data);
                    htmlInputElement.value = ""; // for detecting same file
                })
            );
        }
    }
   
    onDropdownShowed(): void {
        this.uploadingModal.data.files = [];
        this.uploadingModal.data.docType = {} as IMultiSelectData;
    }
    
}