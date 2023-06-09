import { ITransferDetails } from '../../../services/view-transfer-details/types';

export interface ITransferDetailsWithRetRefNumber extends ITransferDetails {
  retRefNumber: string;
}
