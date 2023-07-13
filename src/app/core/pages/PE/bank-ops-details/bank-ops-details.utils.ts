import { IBankOpsDetails } from './bank-ops-details.types';
import { DatePickerHelper } from '../../../../shared/components/controls/date-picker/date-picker-helper';
import { IApplicationDetails } from '../../../../shared/types/get-application-details';

export function prepareBankOpsDetails(applicationDetails: IApplicationDetails | null): IBankOpsDetails {
  if (!applicationDetails) {
    return {
      autoChecks: [],
      manualChecks: [],
      requestedDocuments: [],
      responsedDocuments: [],
      paymentID: '',
      pmtCreationTime: '',
      payerName: '',
      payerAccount: '',
      payeeName: '',
      payeeAccount: '',
      payeeINN: '',
      payeeBIC: '',
      paymentPurpose: '',
      amount: 0,
    };
  }

  const { payment, autoChecks, manualChecks, requestedDocuments, responsedDocuments } = applicationDetails;

  return {
    autoChecks,
    manualChecks,
    requestedDocuments,
    responsedDocuments,
    paymentID: payment.paymentID,
    pmtCreationTime: DatePickerHelper.format(DatePickerHelper.parseFromLocaleStringToDate(payment.pmtCreationTime)),
    payerName: payment.paymentApplication.payer.user
      ? `${payment.paymentApplication.payer.user.naturalSurname} ${payment.paymentApplication.payer.user.naturalName} ${payment.paymentApplication.payer.user.naturalPatronymic}`
      : '',
    payerAccount: payment.paymentApplication.payer.requisites?.account ?? '',
    payeeName: payment.paymentApplication.payee.user
      ? `${payment.paymentApplication.payee.user.naturalSurname} ${payment.paymentApplication.payee.user.naturalName} ${payment.paymentApplication.payee.user.naturalPatronymic}`
      : '',
    payeeAccount: payment.paymentApplication.payee.requisites?.account ?? '',
    payeeINN: payment.paymentApplication.payee.user?.inn ?? '',
    payeeBIC: payment.paymentApplication.payee.requisites?.bankBIC ?? '',
    paymentPurpose: payment.paymentApplication.paymentPurpose,
    amount: payment.paymentApplication.amount,
  };
}