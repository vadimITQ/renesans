import { IBankOpsDetailsRequestedDocs } from 'src/app/core/pages/PE/bank-ops-details/bank-ops-details.types';
import { ISearchPayment } from '../../core/services/search-payment/types';
import { IPEUploadingData } from '../components/file-uploading-modal/file-uploading-modal.types';

export interface IAutoCheck {
  autoAMLRule: string;
  autoAntiFraudRule: string;
  autoBankOpsRule: string;
}

export interface IManualCheck {
  checkType: string;
  status: string;
  userLogin: string;
  startDate: string;
  endDate: string;
}

export interface IRequestedDocument {
  docID: string;
  docType: string;
  userLogin: string;
  requestTime: string;
  department: string;
  docs?: IBankOpsDetailsRequestedDocs;
}

export interface IResponsedDocument {
  docID: string;
  responseTime: string;
}
export interface ITypesRequestedDocument {
  docTypeID: string;
  docTypeName: string;
}

export interface IComment {
  ID: string;
  parentID: string;
  parentType: string;
  comment: string;
  login: string;
  requestTime: string;
  department: string;
}

export interface IApplicationDetails {
  payment: ISearchPayment;
  autoChecks: IAutoCheck[];
  manualChecks: IManualCheck[];
  requestedDocuments: IRequestedDocument[];
  comments: IComment[];
  responsedDocuments: IResponsedDocument[];
  typesRequestedDocuments: ITypesRequestedDocument[];
}
