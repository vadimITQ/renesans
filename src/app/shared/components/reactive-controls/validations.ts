import { PEReactiveHelper } from "./utils";
import { GlobalReactiveErrorsEnum, globalMessages } from "./global-error-messages";
import { IFormGroupWithDates } from "./reactive-forms-modals";
import { FormControl, FormGroup } from "@angular/forms";
import { ToastService } from "../../services/toast.service";
import { format } from "date-fns";
import { dateFormat } from "../controls/date-picker/date-picker.constants";

export class PEGlobalValidators {

    public static validateDates(group: IFormGroupWithDates): void {

      if (PEReactiveHelper.isFormGroup(group)){
        const dateFrom = group.controls.dateTimeFrom;
        const dateTo = group.controls.dateTimeTo;
        const dateFromValue = dateFrom.value as Date; 
        const dateToValue = dateTo.value as Date;
        const timeValueFrom = !!dateFromValue ? dateFromValue.getTime(): 0;
        const timeValueTo = !!dateToValue ? dateToValue.getTime(): 0;
        const range: number = (timeValueTo - timeValueFrom) / (1000 * 60 * 60 * 24);

        if (!dateFromValue && !dateToValue){
          dateFrom.setErrors(null);
          dateTo.setErrors(null);
          return;
        }

        if (!dateFromValue || !dateToValue) {
          !dateFromValue ? dateFrom.setErrors({[GlobalReactiveErrorsEnum.Required]: true }): "";
          !dateToValue ? dateTo.setErrors({[GlobalReactiveErrorsEnum.Required]: true }): "";
          group.setErrors({
            [GlobalReactiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReactiveErrorsEnum.Required]: true
          });
          return;
        }

        if (timeValueFrom > timeValueTo){
          dateFrom.setErrors({[GlobalReactiveErrorsEnum.DateFromMoreThanDateTo]: true});
          dateTo.setErrors({[GlobalReactiveErrorsEnum.EmptyError]: true });
          group.setErrors({
            [GlobalReactiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReactiveErrorsEnum.DateFromMoreThanDateTo]: true
          });
          return;
        }

        if (range > 40){
          dateFrom.setErrors({[GlobalReactiveErrorsEnum.EmptyError]: true });
          dateTo.setErrors({[GlobalReactiveErrorsEnum.DatesRangeLimit]: true });
          group.setErrors({
            [GlobalReactiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReactiveErrorsEnum.DatesRangeLimit]: true
          });
          return;
        }

      }

    }

    public static validatePlannedDateWithToday(control: FormControl<Date | null>): void {
      if (!!control && !!control.value && PEReactiveHelper.isFormGroup(control.parent)){
        const today: Date = new Date();
        const plannedDate = control.value;
        const group = control.parent;
        today.setHours(0, 0, 0, 0);
        if (today.getTime() > plannedDate.getTime()){
          control.setErrors({
            [GlobalReactiveErrorsEnum.PlannedDateNoValid]: true
          });
          group.setErrors({
            [GlobalReactiveErrorsEnum.FormGroupNoValid]: true,
            [GlobalReactiveErrorsEnum.PlannedDateNoValid]: true
          });
        }
      }
    }

    public static getLastErrorMessage(group: FormGroup): string | null {
      
      const errors = Object.keys(group.errors ?? {});
  
      if (errors.includes(GlobalReactiveErrorsEnum.DateFromMoreThanDateTo)) {
        return globalMessages.datesValidation[GlobalReactiveErrorsEnum.DateFromMoreThanDateTo];
      }
  
      if (errors.includes(GlobalReactiveErrorsEnum.DatesRangeLimit)) {
        return globalMessages.datesValidation[GlobalReactiveErrorsEnum.DatesRangeLimit];
      }
  
      if (errors.includes(GlobalReactiveErrorsEnum.Required)) {
        return "Заполните обязательные поля";
      }

      if (errors.includes(GlobalReactiveErrorsEnum.PlannedDateNoValid)) {
        const today = format(new Date(), dateFormat);
        return `Плановая дата не должна быть раньше, чем ${ today }`;
      }

      return null;

    }

}