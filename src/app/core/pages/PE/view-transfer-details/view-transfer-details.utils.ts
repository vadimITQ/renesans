import { ITransferDetails } from '../../../services/view-transfer-details/types';
import { dateFormatWithTime } from '../../../../shared/components/controls/date-picker/date-picker.constants';
import { format } from 'date-fns';
import { paymentStatusObj } from '../../../../shared/variables/payment-status';
import {ITransferDetailsWithRetRefNumber} from "./view-transfer-details.types";

export function prepareTransferDetails(transferDetails: ITransferDetails): ITransferDetailsWithRetRefNumber {
  return {
    ...transferDetails,
    appCreationTime: transferDetails.appCreationTime ? format(new Date(transferDetails.appCreationTime), dateFormatWithTime) : '',
    retRefNumber: transferDetails.paymentID.length > 11 ? transferDetails.paymentID.substring(transferDetails.paymentID.length - 12) : '',
    statusHistory: transferDetails.statusHistory.map(value => ({
      ...value,
      statusChangeTime: format(new Date(value.statusChangeTime), dateFormatWithTime),
      statusComment: paymentStatusObj[value.codeStatus ?? ''],
    })),
  };
}
