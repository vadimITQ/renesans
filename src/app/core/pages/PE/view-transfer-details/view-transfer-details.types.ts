import { ITransferDetails, StatusHistory } from '../../../services/view-transfer-details/types';

export interface IViewStatusHistory extends Omit<StatusHistory, 'appCreationTime'> {
  appCreationTime: string;
}

export interface IViewTransferDetails extends Omit<ITransferDetails, 'appCreationTime' | 'statusHistory'> {
  appCreationTime: string | null;

  statusHistory: IViewStatusHistory[];
}
