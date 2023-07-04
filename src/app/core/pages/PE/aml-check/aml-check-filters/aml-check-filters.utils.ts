import { sub } from 'date-fns';
import { Validation } from '../../../../../shared/validation/types';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import { IAmlCheckFilters } from './aml-check-filters.types';
import { IGetApplicationsListPayload } from '../../../../../shared/types/get-applications-list';

export function defineDefaultFiltersValues(): IAmlCheckFilters {
  const dateTimeTo = new Date();
  const dateTimeFrom = sub(dateTimeTo, { days: 3 });

  return {
    paymentID: null,
    applicationID: null,
    dateTimeFrom,
    dateTimeTo,
    applicationStatuses: [],
    agedOnly: false,
  };
}

export function anyFieldFilledValidator(filters: IAmlCheckFilters): Validation | null {
  const { paymentID, applicationID, dateTimeFrom, dateTimeTo, applicationStatuses } = filters;
  const isAnyFieldFilled = [paymentID, applicationID, dateTimeFrom, dateTimeTo, applicationStatuses.length].some(value => !!value);

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

export function generalFieldsFilled(filters: IAmlCheckFilters): boolean {
  const { paymentID, applicationID, applicationStatuses } = filters;

  return [paymentID, applicationID, applicationStatuses.length].some(Boolean);
}

export function prepareSearchFilters({
  paymentID,
  applicationID,
  dateTimeFrom,
  dateTimeTo,
  applicationStatuses,
  agedOnly,
}: IAmlCheckFilters): IGetApplicationsListPayload {
  const { manualAMLCheckStatusList, manualAntiFraudCheckStatusList, manualBankOpsCheckStatusList } = applicationStatuses.reduce<{
    manualAMLCheckStatusList: string[];
    manualAntiFraudCheckStatusList: string[];
    manualBankOpsCheckStatusList: string[];
  }>(
    (acc, curr) => {
      if (curr.label.includes('AML')) {
        acc.manualAMLCheckStatusList.push(curr.value);
      }
      if (curr.label.includes('AntiFraud')) {
        acc.manualAntiFraudCheckStatusList.push(curr.value);
      }
      if (curr.label.includes('BankOps')) {
        acc.manualBankOpsCheckStatusList.push(curr.value);
      }

      return acc;
    },
    {
      manualAMLCheckStatusList: [],
      manualAntiFraudCheckStatusList: [],
      manualBankOpsCheckStatusList: [],
    },
  );
  return {
    dateTimeFrom: !!dateTimeFrom ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.toISOString()) : undefined,
    dateTimeTo: !!dateTimeTo ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.toISOString()) : undefined,
    paymentID: !!paymentID ? paymentID : undefined,
    applicationID: !!applicationID ? applicationID : undefined,
    manualAMLCheckStatusList: manualAMLCheckStatusList?.length > 0 ? manualAMLCheckStatusList : undefined,
    manualAntiFraudCheckStatusList: manualAntiFraudCheckStatusList?.length > 0 ? manualAntiFraudCheckStatusList : undefined,
    manualBankOpsCheckStatusList: manualBankOpsCheckStatusList?.length > 0 ? manualBankOpsCheckStatusList : undefined,
    agedOnly,
  };
}
