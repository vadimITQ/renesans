import { sub } from 'date-fns';
import { Validation } from '../../../../../shared/validation/types';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { IBankOpsCheckFilters } from './bank-ops-check-filters.types';
import { IGetApplicationsListPayload } from '../../../../../shared/types/get-applications-list';

export function defineDefaultFiltersValues(): IBankOpsCheckFilters {
  const dateTimeTo = new Date();
  const dateTimeFrom = sub(dateTimeTo, { days: 3 });

  return {
    paymentID: null,
    applicationID: null,
    dateTimeFrom,
    dateTimeTo,
    manualBankOpsCheckStatusList: [],
  };
}

export function anyFieldFilledValidator(filters: IBankOpsCheckFilters): Validation | null {
  const { paymentID, applicationID, dateTimeFrom, dateTimeTo, manualBankOpsCheckStatusList } = filters;
  const isAnyFieldFilled = [paymentID, applicationID, dateTimeFrom, dateTimeTo, manualBankOpsCheckStatusList.length].some(value => !!value);

  if (!isAnyFieldFilled) {
    return {
      paymentID: ' ',
      applicationID: ' ',
      dateTimeFrom: ' ',
      dateTimeTo: ' ',
      applicationStatus: ' ',
    };
  }

  return null;
}

export function generalFieldsFilled(filters: IBankOpsCheckFilters): boolean {
  const { paymentID, applicationID, manualBankOpsCheckStatusList } = filters;

  return [paymentID, applicationID, manualBankOpsCheckStatusList.length].some(Boolean);
}

export function prepareSearchFilters({
  paymentID,
  applicationID,
  dateTimeFrom,
  dateTimeTo,
  manualBankOpsCheckStatusList,
}: IBankOpsCheckFilters): IGetApplicationsListPayload {
  return {
    dateTimeFrom: !!dateTimeFrom ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.toISOString()) : undefined,
    dateTimeTo: !!dateTimeTo ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.toISOString()) : undefined,
    paymentID: !!paymentID ? paymentID : undefined,
    applicationID: !!applicationID ? applicationID : undefined,
    manualBankOpsCheckStatusList: manualBankOpsCheckStatusList?.length > 0 ? manualBankOpsCheckStatusList.map(v => v.value) : undefined,
  };
}
