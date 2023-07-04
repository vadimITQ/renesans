import { IMultiSelectData } from '../controls/pe-multiselect/pe-multiselect.component';

export class FileUploadingModal {

  constructor(public show: boolean, public header: string, public data: IPEUploadingData) {}

  get files(): PEUploadingFileList {
    return this.data.files;
  }

  get docType(): IMultiSelectData | null {
    return this.data.docType;
  }

  public showModal() {
    this.show = true;
  }

  public hideModal() {
    this.show = false;
  }
  
  public setData(data: IPEUploadingData): void {
    this.data = {
      docType: data.docType,
      files: [...data.files],
    };
  }

  public getData(): IPEUploadingData {
    return {
      docType: this.data.docType,
      files: [...this.data.files]
    };
  }
  
  public setState(state: FileUploadingModal): void {
    this.setData(state.data);
    this.header = state.header;
    this.show = state.show;
  }

  public clear() {
    const defaultModal = FileUploadingModal.createDefaultModal();
    this.show = defaultModal.show;
    this.header = defaultModal.header;
    this.data = {
      docType: defaultModal.data.docType,
      files: defaultModal.data.files,
    };
  }

  static createModal(configuration: { show: boolean; header: string; data: IPEUploadingData }): FileUploadingModal {
    return new FileUploadingModal(configuration.show, configuration.header, configuration.data);
  }

  static createDefaultModal(): FileUploadingModal {
    return new FileUploadingModal(false, 'Добавление документа', {
      docType: {} as IMultiSelectData,
      files: [],
    });
  }

}

export interface IFileUploadingModal {
  show: boolean;
  header: string;
  data: IPEUploadingData;
}

export interface IPEUploadingData {
  files: PEUploadingFileList;
  docType: IMultiSelectData;
}

export type PEUploadingFileList = PEUploadingFile[];

export interface PEUploadingFile {
  file: File | null;
  data: Blob | null;
}
