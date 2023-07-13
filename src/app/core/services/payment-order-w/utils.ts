
import { IApplicationDetails } from '../../../shared/types/get-application-details';

export function executeRequestedDocsCommentary(applicationDetails: IApplicationDetails | null): IApplicationDetails | null {
  if (applicationDetails)
  {
    applicationDetails.comments.forEach(commentary => {
      const document = applicationDetails.requestedDocuments.filter(doc => doc.docID === commentary.parentID)[0];
      if (!!document && !!commentary.comment && !!commentary.department){
        const department = commentary.department;
        department === 'BANK_OPS' ? document.bankOpsCommentary = commentary.comment: '';
        department === 'AML' ? document.amlCommentary = commentary.comment: '';
      }
    });
  }
  return applicationDetails;
}
  