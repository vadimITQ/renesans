
import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { IAmlDetailsForm } from "./aml-details.types";
import { DatePickerHelper } from '../../../../shared/components/controls/date-picker/date-picker-helper';
import { IApplicationDetails, IAutoCheck, IManualCheck, IRequestedDocument, IResponsedDocument } from '../../../../shared/types/get-application-details';

@Injectable({
    providedIn: "root"
})
export class AmlDetailsUtils {
    
    constructor(private fb: FormBuilder){}

    createEmptyForm(): FormGroup<IAmlDetailsForm>{
      return this.fb.group<IAmlDetailsForm>(
          {
              paymentID: new FormControl(null),
              pmtCreationTime: new FormControl(null),
              payerName: new FormControl(null),
              payerAccount: new FormControl(null),
              payeeName: new FormControl(null),
              payeeAccount: new FormControl(null),
              payeeINN: new FormControl(null),
              payeeBIC: new FormControl(null),
              paymentPurpose: new FormControl(null),
              amount: new FormControl(null),
              commentary: new FormControl(null),
              autoChecks: this.fb.array<IAutoCheck>([]),
              manualChecks: this.fb.array<IManualCheck>([]),
              requestedDocuments: this.fb.array<IRequestedDocument>([]),
              responsedDocuments: this.fb.array<IResponsedDocument>([])
          }
      );
    }

    prepareAmlDetailsForm(applicationDetails: IApplicationDetails | null): FormGroup<IAmlDetailsForm> {

      if (!applicationDetails) {
        return this.createEmptyForm();
      }
    
      const { payment, autoChecks, manualChecks, requestedDocuments, responsedDocuments } = applicationDetails;
      
      return this.fb.group<IAmlDetailsForm>(
        {
          autoChecks: this.fb.array<IAutoCheck>(autoChecks),
          manualChecks: this.fb.array<IManualCheck>(manualChecks),
          requestedDocuments: this.fb.array<IRequestedDocument>(requestedDocuments),
          responsedDocuments: this.fb.array<IResponsedDocument>(responsedDocuments),
          paymentID: new FormControl(payment.paymentID),
          pmtCreationTime: new FormControl(DatePickerHelper.format(DatePickerHelper.parseFromLocaleStringToDate(payment.pmtCreationTime))),
          payerName: new FormControl(payment.paymentApplication.payer.user?`${payment.paymentApplication.payer.user.naturalSurname} ${payment.paymentApplication.payer.user.naturalName} ${payment.paymentApplication.payer.user.naturalPatronymic}`:''),
          payerAccount: new FormControl(payment.paymentApplication.payer.requisites?.account??''),
          payeeName: new FormControl(payment.paymentApplication.payee.user?`${payment.paymentApplication.payee.user.naturalSurname} ${payment.paymentApplication.payee.user.naturalName} ${payment.paymentApplication.payee.user.naturalPatronymic}`:''),
          payeeAccount: new FormControl(payment.paymentApplication.payee.requisites?.account??''),
          payeeINN: new FormControl(payment.paymentApplication.payee.user?.inn??''),
          payeeBIC: new FormControl(payment.paymentApplication.payee.requisites?.bankBIC??''),
          paymentPurpose: new FormControl(payment.paymentApplication.paymentPurpose),
          amount: new FormControl(payment.paymentApplication.amount),
          commentary: new FormControl('')
        }
      );

    }

}
