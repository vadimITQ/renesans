import { ISearchPaymentFilters } from './search-payment-filters.types';
import { format, sub } from 'date-fns';
import { dateFormat, dateFormatWithTime } from '../../../../../shared/components/controls/date-picker/date-picker.constants';
import { Validation } from '../../../../../shared/validation/types';

export function defineDefaultFiltersValues(): ISearchPaymentFilters {
  const dateTo = new Date();
  const dateFrom = sub(dateTo, { days: 3 });
  return {
    paymentId: '',
    applicationID: '',
    idPH: '',
    docID: '',
    linkedChequeId: '',
    docNum: '',
    account: '',
    channelIP: '',
    userAgent: '',
    chequeNumber: '',
    statusCode: '',
    dateFrom: format(dateFrom, dateFormatWithTime),
    dateTo: format(dateTo, dateFormatWithTime),
    plannedDate: null,
    channelName: [],
    parentType: [],
    type: '',
  };
}

export function anyFieldFilledValidator(filters: ISearchPaymentFilters): Validation | null {
  const { paymentId, applicationID, idPH, docID, linkedChequeId, docNum, account, chequeNumber, dateFrom, dateTo } = filters;
  const isAnyFieldFilled = [paymentId, applicationID, idPH, docID, linkedChequeId, docNum, account, chequeNumber, dateFrom, dateTo].some(
    value => !!value,
  );

  if (!isAnyFieldFilled) {
    return {
      paymentId: ' ',
      applicationID: ' ',
      idPH: ' ',
      docID: ' ',
      linkedChequeId: ' ',
      docNum: ' ',
      account: ' ',
      chequeNumber: ' ',
      dateFrom: ' ',
      dateTo: ' ',
    };
  }

  return null;
}

// export function validateSearchPaymentFilters(filters: ISearchPaymentFilters): Validation | null {
//   const validationErrors = {};
// }
