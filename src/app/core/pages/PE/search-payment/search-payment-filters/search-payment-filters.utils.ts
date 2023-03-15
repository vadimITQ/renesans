import { ISearchPaymentFilters } from './search-payment-filters.types';
import { format, sub } from 'date-fns';
import { dateFormatWithTime } from '../../../../../shared/components/controls/date-picker/date-picker.constants';
import { Validation } from '../../../../../shared/validation/types';
import { ISearchPaymentsPayload } from '../../../../services/search-payment/types';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';

export function defineDefaultFiltersValues(): ISearchPaymentFilters {
  const dateTo = new Date();
  const dateFrom = sub(dateTo, { days: 3 });
  return {
    paymentID: '',
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
    dateTimeFrom: DatePickerHelper.convertToDatePicker(dateFrom),
    dateTimeTo: DatePickerHelper.convertToDatePicker(dateTo),
    plannedDate: DatePickerHelper.convertToDatePicker(new Date(), false),
    channelName: [],
    parentType: [],
    type: [],
  };
}

export function anyFieldFilledValidator(filters: ISearchPaymentFilters): Validation | null {
  const { paymentID, applicationID, idPH, docID, linkedChequeId, docNum, account, chequeNumber, dateTimeFrom, dateTimeTo } = filters;
  const isAnyFieldFilled = [
    paymentID,
    applicationID,
    idPH,
    docID,
    linkedChequeId,
    docNum,
    account,
    chequeNumber,
    dateTimeFrom,
    dateTimeTo,
  ].some(value => !!value);

  if (!isAnyFieldFilled) {
    return {
      paymentID: ' ',
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

export function prepareSearchFilters({
  paymentID,
  applicationID,
  idPH,
  docID,
  linkedChequeId,
  docNum,
  account,
  channelIP,
  userAgent,
  chequeNumber,
  statusCode,
  dateTimeFrom,
  dateTimeTo,
  plannedDate,
  channelName,
  parentType,
  type,
}: ISearchPaymentFilters): ISearchPaymentsPayload {
  return {
    dateTimeFrom: dateTimeFrom ?? '',
    dateTimeTo: dateTimeTo ?? '',
    paymentID,
    applicationID,
    idPH,
    docID,
    account,
    channelIP,
    chequeNumber,
    linkedChequeId,
    statusCode,
    plannedDate: plannedDate ?? '',
    channelName,
    parentType,
    type,
  };
}
