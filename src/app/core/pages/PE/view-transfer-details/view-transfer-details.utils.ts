import { ITransferDetails } from '../../../services/view-transfer-details/types';
import { dateFormatWithTime } from '../../../../shared/components/controls/date-picker/date-picker.constants';
import { format } from 'date-fns';
import {paymentStatusObj} from "../../../../shared/variables/payment-status";

export function prepareTransferDetails(transferDetails: ITransferDetails): ITransferDetails {
  return {
    ...transferDetails,
    statusHistory: transferDetails.statusHistory.map(value => ({
      ...value,
      statusChangeTime: format(new Date(value.statusChangeTime), dateFormatWithTime),
      statusComment:paymentStatusObj[value.codeStatus ?? '']
    })),
  };
}
