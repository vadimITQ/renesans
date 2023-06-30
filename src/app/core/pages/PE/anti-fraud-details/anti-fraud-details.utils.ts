import { IApplicationDetails } from '../../../../shared/types/get-application-details';
import { DatePickerHelper } from '../../../../shared/components/controls/date-picker/date-picker-helper';
import { IAntiFraudDetails } from './anti-fraud-details.types';
import { AutoCheckStatus, ManualCheckStatus } from '../../../../shared/enums/application-details';

export function prepareAntiFraudDetails(applicationDetails: IApplicationDetails | null): IAntiFraudDetails {
  if (!applicationDetails) {
    return {
      autoChecks: [],
      manualChecks: [],
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

  const { payment, autoChecks, manualChecks } = applicationDetails;

  return {
    autoChecks: autoChecks.map(({ autoAntiFraudRule }) => ({
      status: AutoCheckStatus[payment.paymentApplication.check?.autoAntiFraudCheckStatus ?? 0],
      rules: autoAntiFraudRule,
    })),
    manualChecks: manualChecks.map(manualCheck => ({ ...manualCheck, status: ManualCheckStatus[+manualCheck.status] })),
    paymentID: payment.paymentID,
    pmtCreationTime: DatePickerHelper.format(DatePickerHelper.parseFromLocaleStringToDate(payment.pmtCreationTime)),
    payerName: `${payment.paymentApplication.payer.user.naturalSurname} ${payment.paymentApplication.payer.user.naturalName} ${payment.paymentApplication.payer.user.naturalPatronymic}`,
    payerAccount: payment.paymentApplication.payer.requisites.account,
    payeeName: `${payment.paymentApplication.payee.user.naturalSurname} ${payment.paymentApplication.payee.user.naturalName} ${payment.paymentApplication.payee.user.naturalPatronymic}`,
    payeeAccount: payment.paymentApplication.payee.requisites.account,
    payeeINN: payment.paymentApplication.payee.user.inn,
    payeeBIC: payment.paymentApplication.payee.requisites.bankBIC,
    paymentPurpose: payment.paymentApplication.paymentPurpose,
    amount: payment.paymentApplication.amount,
  };
}
