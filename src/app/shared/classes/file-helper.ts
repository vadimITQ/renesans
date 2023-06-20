import { PEUploadingFile, PEUploadingFileList } from 'src/app/shared/components/file-uploading-modal/file-uploading-modal.types';

export class FileHelper {
  static readPEUploadingFileList(fileList: FileList): Promise<PEUploadingFileList> {
    const $fileSteamA: Promise<ArrayBuffer>[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const item = fileList.item(i);
      if (!!item) {
        $fileSteamA.push(item.arrayBuffer());
      }
    }

    return Promise.all($fileSteamA).then(arrayBuffers => {
      return arrayBuffers.map<PEUploadingFile>((arrayBuffer, index) => {
        const result: PEUploadingFile = {
          file: fileList.item(index),
          data: new Blob([arrayBuffer]),
        };
        return result;
      });
    });
  }
}
