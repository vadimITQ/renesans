import { DatePickerHelper } from '../../../../../shared/components/controls/date-picker/date-picker-helper';
import { IApplication } from '../../../../../shared/types/get-applications-list';

export function prepareAmlCheckData(applications: IApplication[]): IApplication[] {
  return applications.map(value => ({
    ...value,
    appCreationTime: DatePickerHelper.format(DatePickerHelper.parseFromLocaleStringToDate(value.appCreationTime)),
  }));
}
