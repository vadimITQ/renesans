
import { IPEUploadingData } from 'src/app/shared/components/file-uploading-modal/file-uploading-modal.types';
import { IApplicationDetails } from '../../../shared/types/get-application-details';

export function executeRequestedDocsCommentary(applicationDetails: IApplicationDetails | null): IApplicationDetails | null {
  if (applicationDetails)
  {
    applicationDetails.comments.forEach(commentary => {
      const document = applicationDetails.requestedDocuments.filter(doc => doc.docID === commentary.parentID)[0];
      if (!!document && !!commentary.comment && !!commentary.department){
        const department = commentary.department;
        if (!document.docs){
          document.docs = {
            commentaryAML: '',
            commentaryBankOps: '',
            filesData: {} as IPEUploadingData
          }
        }
        department === 'BANK_OPS' ? document.docs.commentaryBankOps = commentary.comment: '';
        department === 'AML' ? document.docs.commentaryAML = commentary.comment: '';
      }
    });
  }
  return applicationDetails;
}
  