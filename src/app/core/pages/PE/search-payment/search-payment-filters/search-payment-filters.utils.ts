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
    // dateTimeFrom: dateTimeFrom ?? null,
    // dateTimeTo: dateTimeTo ?? null,
    // paymentId: paymentID ?? null,

    // todo: fix me
    dateTimeFrom: '2023-02-01T11:39:33.194Z',
    dateTimeTo: '2023-02-13T11:40:34.194Z',
    paymentId: '10fef8e7-e3cc-38b4-90c7-0e5f218c1dc7',

    applicationID: applicationID ?? null,
    idPH: idPH ?? null,
    docID: docID ?? null,
    docNum: docNum ?? null,
    userAgent: userAgent ?? null,
    account: account ?? null,
    channelIP: channelIP ?? null,
    chequeNumber: chequeNumber ?? null,
    linkedChequeId: linkedChequeId ?? null,
    statusCode: statusCode.length ? statusCode.map(v => v.value) : null,
    plannedDate: plannedDate ?? null,
    channelName: channelName.length ? channelName.map(v => v.value) : null,
    parentType: parentType.length ? parentType.map(v => v.value) : null,
    type: type.length ? type.map(v => v.value) : null,
  };
}
