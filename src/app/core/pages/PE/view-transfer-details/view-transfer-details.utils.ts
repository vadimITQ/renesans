import { ITransferDetails } from '../../../services/view-transfer-details/types';
import { IViewTransferDetails } from './view-transfer-details.types';
import { format } from 'date-fns';
import { dateFormatWithTime } from '../../../../shared/components/controls/date-picker/date-picker.constants';

export function defineTransferDetailsData(transferDetails: ITransferDetails): IViewTransferDetails {
  return {
    ...transferDetails,
    appCreationTime: format(new Date(transferDetails.appCreationTime), dateFormatWithTime),
    statusHistory: transferDetails.statusHistory.map(value => ({
      ...value,
      appCreationTime: format(new Date(value.appCreationTime), dateFormatWithTime),
    })),
  };
}
