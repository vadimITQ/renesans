import { ISearchPaymentFilters } from './search-payment-filters.types';
import { sub } from 'date-fns';
import { Validation } from '../../../../../shared/validation/types';
import { ISearchPaymentsPayload } from '../../../../services/search-payment/types';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';

export function defineDefaultFiltersValues(): ISearchPaymentFilters {
  const dateTo = new Date();
  const dateFrom = sub(dateTo, { days: 3 });
  return {
    paymentID: null,
    applicationID: null,
    idPH: null,
    docID: null,
    linkedChequeId: null,
    docNum: null,
    account: null,
    channelIP: null,
    userAgent: null,
    chequeNumber: null,
    statusCode: [],
    dateTimeFrom: DatePickerHelper.convertToDatePicker(dateFrom),
    dateTimeTo: DatePickerHelper.convertToDatePicker(dateTo),
    plannedDate: null,
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
    dateTimeFrom: !!dateTimeFrom ? dateTimeFrom: null,
    dateTimeTo: !!dateTimeTo ? dateTimeTo: null,
    paymentId: !!paymentID ? paymentID: null,
    applicationID: !!applicationID ? applicationID: null,
    idPH: !!idPH ? idPH: null,
    docID: !!docID ? docID: null,
    docNum: !!docNum ? docNum: null,
    userAgent: !!userAgent ? userAgent: null,
    account: !!account ? account: null,
    channelIP: !!channelIP ? channelIP: null,
    chequeNumber: !!chequeNumber ? chequeNumber: null,
    linkedChequeId: !!linkedChequeId ? linkedChequeId: null,
    plannedDate: !!plannedDate ? plannedDate: null,
    statusCode: statusCode?.length == 1 ? statusCode[0].value ?? null : null,
    channelName: channelName?.length > 0 ? channelName.map(v => v.value) : null,
    parentType: parentType?.length > 0 ? parentType.map(v => v.value) : null,
    type: type?.length > 0 ? type.map(v => v.value) : null,
  };
}
