import { ITransferDetails } from '../../../services/view-transfer-details/types';
import { dateFormatWithDotsAndTime, dateFormatWithTime } from '../../../../shared/components/controls/date-picker/date-picker.constants';
import { format } from 'date-fns';
import { paymentStatusObj } from '../../../../shared/variables/payment-status';
import { ITransferDetailsWithRetRefNumber } from './view-transfer-details.types';
import { covertToSeparatedNumber } from '../../../../shared/utils/number';

export function prepareTransferDetails(transferDetails: ITransferDetails | null): ITransferDetailsWithRetRefNumber {
  if (!transferDetails) {
    return {
      amount: '0,00',
      appCreationTime: '',
      retRefNumber: '',
      idPH: '',
      operatorLegalName: '',
      payeeAccount: '',
      payeeBankBIC: '',
      payeeInn: '',
      payeeName: '',
      payerAccount: '',
      payerName: '',
      paymentID: '',
      paymentPurpose: '',
      serviceName: '',
      statusHistory: [],
    };
  }
  return {
    ...transferDetails,
    appCreationTime: transferDetails.appCreationTime ? format(new Date(transferDetails.appCreationTime), dateFormatWithDotsAndTime) : '',
    retRefNumber: transferDetails.paymentID.length > 11 ? transferDetails.paymentID.substring(transferDetails.paymentID.length - 12) : '',
    amount: !Number.isNaN(transferDetails.amount) ? covertToSeparatedNumber(transferDetails.amount) : '0,00',
    statusHistory: transferDetails.statusHistory.map(value => ({
      ...value,
      statusChangeTime: format(new Date(value.statusChangeTime), dateFormatWithTime),
      statusComment: paymentStatusObj[value.codeStatus ?? ''],
    })),
  };
}
