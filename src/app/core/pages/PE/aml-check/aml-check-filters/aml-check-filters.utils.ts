import { sub } from 'date-fns';
import { Validation } from '../../../../../shared/validation/types';
import { DatePickerHelper } from 'src/app/shared/components/controls/date-picker/date-picker-helper';
import {IAmlCheckFilters} from "./aml-check-filters.types";
import {IAmlCheckFiltersPayload} from "../../../../services/aml-check/types";

export function defineDefaultFiltersValues(): IAmlCheckFilters {
  const dateTimeTo = new Date();
  const dateTimeFrom = sub(dateTimeTo, { days: 3 });

  return {
    paymentID: null,
    applicationID: null,
    dateTimeFrom,
    dateTimeTo,
    applicationStatus: [],
    onlyExpired: false
  };
}

export function anyFieldFilledValidator(filters: IAmlCheckFilters): Validation | null {
  const { paymentID, applicationID, dateTimeFrom, dateTimeTo, applicationStatus } = filters;
  const isAnyFieldFilled = [paymentID, applicationID, dateTimeFrom, dateTimeTo, applicationStatus.length].some(value => !!value);

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
  const { paymentID, applicationID, applicationStatus } = filters;

  return [paymentID, applicationID, applicationStatus.length].some(Boolean);
}

export function prepareSearchFilters({
  paymentID,
  applicationID,
  dateTimeFrom,
  dateTimeTo,
  applicationStatus,
  onlyExpired
}: IAmlCheckFilters): IAmlCheckFiltersPayload {
  return {
    dateTimeFrom: !!dateTimeFrom ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeFrom.toISOString()) : null,
    dateTimeTo: !!dateTimeTo ? DatePickerHelper.convertToLocaleStringWithTimezone(dateTimeTo.toISOString()) : null,
    paymentID: !!paymentID ? paymentID : null,
    applicationID: !!applicationID ? applicationID : null,
    applicationStatus: applicationStatus?.length > 0 ? applicationStatus.map(v => v.value) : null,
    onlyExpired
  };
}
