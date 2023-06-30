import { IApplicationDetails } from '../../../../shared/types/get-application-details';

export interface IAntiFraudAutoCheck {
  status: string;
  rules: string;
}

export interface IAntiFraudDetails extends Pick<IApplicationDetails, 'manualChecks'> {
  autoChecks: IAntiFraudAutoCheck[];
  paymentID: string;
  pmtCreationTime: string;
  payerName: string;
  payerAccount: string;
  payeeName: string;
  payeeAccount: string;
  payeeINN: string;
  payeeBIC: string;
  paymentPurpose: string;
  amount: number;
}
