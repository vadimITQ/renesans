import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MultiselectDataSets } from '../../enums/datasets.enums';
import { IMultiSelectData } from '../controls/pe-multiselect/pe-multiselect.component';
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';
import { FileHelper } from '../../classes/file-helper';
import { FileUploadingModal, IPEUploadingData } from './file-uploading-modal.types';
import { DEFAULT_MODAL_STYLE } from './file-uploading-modal.variables';

@Component({
  selector: 'pe-file-uploading-modal',
  templateUrl: './file-uploading-modal.component.html',
  styleUrls: ['./file-uploading-modal.component.scss'],
})
export class FileUploadingModalComponent {
  
  constructor(private toast: ToastService, private loading: LoadingService) {}

  @ViewChild('fileForm', { static: true }) fileForm!: ElementRef<HTMLInputElement>;

  @Input() modal: FileUploadingModal = FileUploadingModal.createDefaultModal();
  @Input() multipleFiles: boolean = false;
  @Input() disabled: boolean = false;
  @Input() closable: boolean = true;
  @Input() style: { [key: string]: string } = DEFAULT_MODAL_STYLE;

  @Output() getUploadigData: EventEmitter<IPEUploadingData> = new EventEmitter<IPEUploadingData>();
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public readonly fileTypes = MultiselectDataSets.GetFileTypes;
  private _show: boolean = false;

  @Input() get show(): boolean {
    return this._show;
  }

  set show(showValue: boolean) {
    this._show = showValue;
    this.showChange.emit(showValue);
  }

  openFileDialog(event: IMultiSelectData) {
    setTimeout(() => {
      this.modal.data.files = [];
      this.fileForm.nativeElement.accept = event.value;
      this.fileForm.nativeElement.click();
    });
  }

  fileUpload(e: Event): void {
    const htmlInputElement = e.target as HTMLInputElement;
    if (!htmlInputElement.files?.length) {
      return;
    }
    if (htmlInputElement.files.length > 0) {
      this.loading.attach(
        FileHelper.readPEUploadingFileList(htmlInputElement.files).then(uploadingFileList => {
          uploadingFileList.forEach(file => {
            this.toast.showSuccessToast(`Добавлен файл ${file.file?.name ?? ''}`);
          });
          this.modal.data.files = uploadingFileList;
          this.getUploadigData.emit(this.modal.data);
          htmlInputElement.value = ''; // for detecting same file
        }),
      );
    }
  }

  onDropdownShowed(): void {
    this.modal.data.files = [];
    this.modal.data.docType = {} as IMultiSelectData;
  }

}
