import { IMultiSelectData } from '../controls/pe-multiselect/pe-multiselect.component';

export class FileUploadingModal {
  constructor(public show: boolean, public header: string, public data: IPEUploadingData) {}

  showModal() {
    this.show = true;
  }

  hideModal() {
    this.show = false;
  }

  setData(data: IPEUploadingData): void {
    this.data = {
      commentary: data.commentary,
      docType: data.docType,
      files: [...data.files],
    };
  }

  setState(state: FileUploadingModal): void {
    this.setData(state.data);
    this.header = state.header;
    this.show = state.show;
  }

  clear() {
    const defaultModal = FileUploadingModal.createDefaultModal();
    this.show = defaultModal.show;
    this.header = defaultModal.header;
    this.data = {
      commentary: defaultModal.data.commentary,
      docType: defaultModal.data.docType,
      files: defaultModal.data.files,
    };
  }

  static createModal(configuration: { show: boolean; header: string; data: IPEUploadingData }): FileUploadingModal {
    return new FileUploadingModal(configuration.show, configuration.header, configuration.data);
  }

  static createDefaultModal(): FileUploadingModal {
    return new FileUploadingModal(false, 'Добавление документа', {
      commentary: '',
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
  commentary: string;
}

export type PEUploadingFileList = PEUploadingFile[];

export interface PEUploadingFile {
  file: File | null;
  data: Blob | null;
}
